const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// 用户注册
usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const existingUser = await User.findOne({ username });
  // 验证是否唯一
  if (existingUser) {
    return response.status(400).json({
      error: "用户名已存在",
    });
  }

  // 密码加密保存
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

// 所有用户查看
usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
