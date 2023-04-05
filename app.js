var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 全局异常捕获的库（需要放到app的前面）
require('express-async-errors');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const loginRouter=require('./routes/login')
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const middleware = require('./utils/middleware');



// view engine setup
// __dirname,代表当前文件路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 

mongoose.set('strictQuery', false)
console.info('connecting to', config.MONGODB_URI)
mongoose.connect(config. MONGODB_URI)
  .then(() => {
    console.info('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/login',loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/message',messagesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
