const { test, describe } = require("node:test");
const assert = require("node:assert");
const { favoriteBlog } = require("../utils/list_helper");
const { blogs, listWithOneBlog } = require("./test_helper");

describe("favorite blog", () => {
  test("of empty list is zero", () => {
    const result = favoriteBlog([]);
    assert.deepStrictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = favoriteBlog(listWithOneBlog);
    const expectedReturn = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    assert.deepStrictEqual(result, expectedReturn);
  });

  test("of a bigger list is calculated right", () => {
    const result = favoriteBlog(blogs);
    const expectedReturn = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(result, expectedReturn);
  });
});
