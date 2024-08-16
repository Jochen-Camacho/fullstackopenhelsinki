const { test, describe } = require("node:test");
const assert = require("node:assert");
const { mostLikes } = require("../utils/list_helper");
const { blogs, listWithOneBlog } = require("./test_helper");

describe("most Blogs", () => {
  test("of empty list is zero", () => {
    const result = mostLikes([]);
    assert.deepStrictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = mostLikes(listWithOneBlog);
    const expectedReturn = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    assert.deepStrictEqual(result, expectedReturn);
  });

  test("of a bigger list is calculated right", () => {
    const result = mostLikes(blogs);
    const expectedReturn = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    assert.deepStrictEqual(result, expectedReturn);
  });
});
