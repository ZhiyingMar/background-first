// 路由的事件处理
const jwt = require('jsonwebtoken')
const messagesRouter = require("express").Router();

const Note = require("../models/message");
const User = require("../models/user");

messagesRouter.get("/", async (request, response) => {
  const messages = await Note.find({});
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

const getTokenFrom=request=>{
  const authorization=request.get('authorization');
  if(authorization&&authorization.toLowerCase().startsWith('bearer ')){
      return authorization.substring(7)
  }
  return null
}

messagesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request)
  console.log("kkkk1=>",token);
  // 返回令牌所基于的对象
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user=await User.findById(decodedToken.id);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const messgae = new Note({
    content: body.content,
    important: body?.important ?? false,
    date: new Date(),
    user:user._id
  });
  const savedNote = await messgae.save();
  user.messgaes=user.messgaes.concat(savedNote._id);
  await user.save()

  response.status(201).json(savedNote);
});

messagesRouter.delete("/:id", async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

messagesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const messgae = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, messgae, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = messagesRouter;