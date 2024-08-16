const express = require("express");
const app = express();

const { connectToDatabase } = require("./util/db");
const { PORT } = require("./util/config");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { errorHandler, tokenExtractor } = require("./util/middleware");
const { Blog } = require("./models");
const { fn, col } = require("sequelize");

app.use(express.json());
app.use(tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.get("/api/authors", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [fn("COUNT", col("id")), "articles"],
      [fn("SUM", col("likes")), "likes"],
    ],
    group: "author",
  });

  res.json(authors);
});

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
