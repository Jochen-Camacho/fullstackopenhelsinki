const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const newBlogs = helper.blogs.map((blog) => (blog = new Blog(blog)));
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
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("title is required", async () => {
  const newBlog = {
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("url is required", async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("delete blog functions", async () => {
  const blogAtStart = await helper.blogsInDB();
  const blogToDelete = blogAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await helper.blogsInDB();

  assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1);
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

after(async () => {
  await mongoose.connection.close();
});
