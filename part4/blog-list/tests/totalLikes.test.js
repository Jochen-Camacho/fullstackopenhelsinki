const { test, describe } = require("node:test");
const assert = require("node:assert");
const { totalLikes } = require("../utils/list_helper");
const { blogs, listWithOneBlog } = require("./test_helper");

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});
