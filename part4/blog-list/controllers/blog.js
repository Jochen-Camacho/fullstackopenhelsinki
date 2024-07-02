const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { error } = require("../utils/logger");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    if (!request.body.title || !request.body.url) {
      response.status(400).json({ error: "content missing" });
    }
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    response.status(204).json(deletedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const newBlog = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
