const blogRouter = require("express").Router();
const { Blog, User } = require("../models/index");
const { blogFinder, userFinder } = require("../util/middleware");
const { Op, fn, col } = require("sequelize");

blogRouter.get("/", async (req, res) => {
  try {
    let where = {};

    if (req.query.search) {
      const search = { [Op.substring]: req.query.search };
      where = {
        ...where,
        [Op.or]: [{ title: search }, { author: search }],
      };
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: { include: ["name"] },
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
  }
});

blogRouter.post("/", userFinder, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBlog = await Blog.create({ ...req.body, userId: req.user.id });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error in POST /blogs:", error);
    next(error);
  }
});

blogRouter.delete("/:id", userFinder, blogFinder, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (req.user.id !== req.blog.userId) {
      return res.status(401).json({ error: "Unauthorized. Not the creator." });
    }

    await req.blog.destroy();
    return res.status(204).end();
  } catch (error) {
    console.error("Error in DELETE /blogs/:id:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the blog" });
  }
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      req.blog.likes += 1;
      await req.blog.save();
      res.sendStatus(204).end();
    } else {
      res.sendStatus(404).end();
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = blogRouter;
