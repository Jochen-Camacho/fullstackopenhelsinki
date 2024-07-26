const router = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.post("/reset", async (req, res) => {
  console.log("Resetting database");

  const deletedUsers = await User.deleteMany({});
  const deletedBlogs = await Blog.deleteMany({});
  console.log(
    `Deleted ${deletedUsers.deletedCount} users and ${deletedBlogs.deletedCount} blogs`
  );

  res.status(204).end();
});

module.exports = router;
