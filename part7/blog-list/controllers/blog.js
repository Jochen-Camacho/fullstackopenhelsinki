const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', {
        username: 1,
        name: 1,
        id: 1,
      })
      .populate('comments');
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      if (!request.body.title || !request.body.url) {
        response.status(400).json({ error: 'content missing' });
      }
      const user = request.user;
      console.log(user);
      const blog = new Blog({ ...request.body, user: user.id });
      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog.id);
      await user.save();

      const returnBlog = await Blog.findById(savedBlog.id).populate('user', {
        username: 1,
        name: 1,
        id: 1,
      });

      response.status(201).json(returnBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const currentUser = request.user;

      const id = request.params.id;

      const blog = await Blog.findById(id);

      if (!blog.user.toString() === currentUser.id.toString()) {
        return response.status(401).json({ error: 'User not the creator' });
      }

      await Blog.deleteOne(blog);
      console.log(blog);
      response.status(204).json(blog);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;

    const newBlog = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
    })
      .populate('user', { username: 1, name: 1, id: 1 })
      .populate('comments');

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/:id/comments', async (request, response, next) => {
  const id = request.params.id;

  try {
    const blog = await Blog.findById(id);

    const comment = new Comment({ ...request.body });
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment.id);
    await blog.save();
    const savedBlog = await Blog.findById(blog.id)
      .populate('user', { username: 1, name: 1, id: 1 })
      .populate('comments');

    response.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
