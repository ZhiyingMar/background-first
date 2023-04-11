// 路由的事件处理
const messagesRouter = require("express").Router();
const Note = require("../models/message");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const config = require('../utils/config')

// token的截取
const getTokenFrom = (request) => {
  const authorization = request?.get("Authorization") ?? null;
  
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.replace('bearer ', '');
  }
  return null;
};

messagesRouter.get("/", async (request, response) => {
  const { pageIndex, pageSize } = request.query;
  const messages = await Note.find({})
    .sort({"date":-1})
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



// 添加
messagesRouter.post("/", async (request, response) => {
  // try {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id);
  
    const messgae = new Note({
      content: body.content,
      date: new Date(),
      user: user._id,
      username:user.username
    });
    const savedNote = await messgae.save();
  
    response.status(201).json(savedNote);

});

// 删除留言
messagesRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken?.id) {
    return response.status(401).json({ error: "请登录" });
  }

  // 获取当前笔记
  const note = await Note.find({
    user: decodedToken.id,
    id:request.params.id
  });
  if (note?.length) {
    await Note.findByIdAndRemove(request.params.id);
    return response.status(200).end();
  }
  response.status(500).json({ error: "您没有权限删除该留言" }); 
});
// 更新留言
messagesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken?.id) {
    return response.status(401).json({ error: "请登录" });
  }

  // 获取当前笔记
  const note = await Note.find({
    user: decodedToken.id,
    id:request.params.id
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
      response.status(201).json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = messagesRouter;
