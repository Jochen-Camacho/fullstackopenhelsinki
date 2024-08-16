const { test, describe } = require("node:test");
const assert = require("node:assert");
const { mostBlogs } = require("../utils/list_helper");
const { blogs, listWithOneBlog } = require("./test_helper");

describe("most Blogs", () => {
  test("of empty list is zero", () => {
    const result = mostBlogs([]);
    assert.deepStrictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = mostBlogs(listWithOneBlog);
    const expectedReturn = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    assert.deepStrictEqual(result, expectedReturn);
  });

  test("of a bigger list is calculated right", () => {
    const result = mostBlogs(blogs);
    const expectedReturn = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    assert.deepStrictEqual(result, expectedReturn);
  });
});
