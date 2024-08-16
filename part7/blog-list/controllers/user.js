const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;

    if (!(username && password))
      return response.status(400).json({
        error: "missing username or password",
      });

    if (username.length < 3 || password.length < 3) {
      return response
        .status(400)
        .json({ error: "invalid username or password" });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs");

    response.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
