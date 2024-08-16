const { test, after, beforeEach, before } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);
let token = "";
let user = null;

before(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("root", 10);
  user = new User({
    username: "root",
    name: "Superuser",
    passwordHash,
  });
  await user.save();

  const loginData = await api
    .post("/api/login")
    .send(helper.loginCreds)
    .expect(200);

  token = JSON.parse(loginData.text).token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const newBlogs = helper.blogs.map((blog) => {
    blog = new Blog(blog);
    blog.user = user;
    return blog;
  });
  const promises = newBlogs.map((blog) => blog.save());
  await Promise.all(promises);
});

test("get blogs works as expected in JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier is id", async () => {
  const data = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(Object.hasOwn(data.body[0], "id"), true);
  assert.strictEqual(Object.hasOwn(data.body[0], "_id"), false);
});

test("creates new blog post", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDB();
  assert.strictEqual(blogs.length, helper.blogs.length + 1);
});

test("likes property defaults to 0", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("title is required", async () => {
  const newBlog = {
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400);
});

test("url is required", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400);
});

test("delete blog functions", async () => {
  const blogsAtStart = await helper.blogsInDB();
  console.log("Blogs at start:", blogsAtStart); // Log initial blogs
  const blogToDelete = blogsAtStart[0];

  console.log("Blog to delete:", blogToDelete); // Log the blog to delete

  const response = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204);

  console.log("Delete response:", response.body); // Log the delete response

  const blogsAtEnd = await helper.blogsInDB();
  console.log("Blogs at end:", blogsAtEnd); // Log final blogs

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
});

test("updating information works", async () => {
  const blogs = await helper.blogsInDB();
  const blogToEdit = blogs[0];
  const edittedBlog = {
    ...blogToEdit,
    likes: 20,
  };

  await api.put(`/api/blogs/${blogToEdit.id}`).send(edittedBlog);

  const blogsAtEnd = await helper.blogsInDB();

  assert.deepStrictEqual(edittedBlog, blogsAtEnd[0]);
});

test("user with correct data is created", async () => {
  const newUser = {
    username: "test",
    name: "test",
    password: "test",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const users = await helper.usersInDB();
  assert.strictEqual(users.length, 2);
});

test("invalid user creation fails", async () => {
  const newUser = {
    username: "t",
    name: "t",
    password: "t",
  };

  const response = await api.post("/api/users").send(newUser).expect(400);

  const users = await helper.usersInDB();
  assert.strictEqual(users.length, 2);
  assert.strictEqual(
    JSON.parse(response.error.text).error,
    "invalid username or password"
  );
});

test("create blog fails without token", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);

  const blogs = await helper.blogsInDB();
  assert.strictEqual(blogs.length, helper.blogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
