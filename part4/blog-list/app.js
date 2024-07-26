const { PORT, MONGO_URL } = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

logger.info("connecting to: ", MONGO_URL);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    logger.info(`connected to PORT ${PORT}`);
  })
  .catch((error) => logger.error(error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
