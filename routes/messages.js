// 路由的事件处理
const jwt = require("jsonwebtoken");
const messagesRouter = require("express").Router();

const Note = require("../models/message");
const User = require("../models/user");

messagesRouter.get("/", async (request, response) => {
  const { pageIndex, pageSize } = request.query;
  const messages = await Note.find({})
    .skip(pageIndex * pageSize)
    .limit(pageSize);
  response.json(messages);
});

messagesRouter.get("/:id", async (request, response, next) => {
  const messgae = await Note.findById(request.params.id);
  if (messgae) {
    response.json(messgae);
  } else {
    response.status(404).end();
  }
});

// token的截取
const getTokenFrom = (request) => {
  const authorization = request?.get("authorization") ?? null;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// 添加
messagesRouter.post("/", async (request, response) => {
  const body = request.body;

  // 返回令牌所基于的对象
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken?.id) {
    return response.status(401).json({ error: "请登录" });
  }

  const user = await User.findById(decodedToken.id);

  const messgae = new Note({
    content: body.content,
    date: new Date(),
    user: user._id,
    username:user.username
  });
  const savedNote = await messgae.save();

  response.json(savedNote);
});
// 删除留言
messagesRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken?.id) {
    return response.status(401).json({ error: "请登录" });
  }
  console.log("demmo");

  // 获取当前笔记
  const note = await Note.find({
    user: decodedToken.id,
  });
  if (note?.length) {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
  response.json({ error: "您没有权限删除该留言" });
});
// 更新留言
messagesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken?.id) {
    return response.status(401).json({ error: "请登录" });
  }
  console.log("demmo");

  // 获取当前笔记
  const note = await Note.find({
    user: decodedToken.id,
  });
  if (!note?.length) {
    return response.status(500).json({ error: "您没有权限更改该留言" });
  }

  const messgae = {
    content: body.content,
  };

  //  message不填写为之前的
  Note.findByIdAndUpdate(request.params.id, messgae, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = messagesRouter;
