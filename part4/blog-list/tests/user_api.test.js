const { test, after, beforeEach, describe } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const assert = require("node:assert");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const newUsers = helper.users.map(
    async (user) => await api.post("/api/users").send(user)
  );
  // const promises = newUsers.map((user) => user.save());
  // await Promise.all(promises);
});

describe("user creation", () => {
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
    assert.strictEqual(users.length, helper.users.length + 1);
  });
});

after(() => {
  mongoose.connection.close();
});
