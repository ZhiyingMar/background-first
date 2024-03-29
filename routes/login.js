const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require('../utils/config')

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;
  
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({ error: "用户名或密码错误" });
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    };
  
    //  设定token
    const token = jwt.sign(userForToken, config.SECRET,{expiresIn:"5d"});
    response
      .status(200)
      .send({ token, username: user.username, userId: user._id});
  });
  
  module.exports = loginRouter;