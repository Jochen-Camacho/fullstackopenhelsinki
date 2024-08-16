const { Blog, User } = require("../models/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const blogFinder = async (req, _, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (error) {
    console.error(error);
  }
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");

  if (auth && auth.startsWith("Bearer ")) {
    req.token = auth.replace("Bearer ", "");
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.name, err.message);

  switch (err.name) {
    case "SequelizeValidationError":
      return res.status(400).json({ error: err.errors.map((e) => e.message) });
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({ error: "Unique constraint violation" });
    default:
      next(err);
  }
};

const userFinder = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(req.token, SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: "token invalid",
    });
  }

  req.user = await User.findByPk(decodedToken.id);
  next();
};

module.exports = { blogFinder, errorHandler, tokenExtractor, userFinder };
