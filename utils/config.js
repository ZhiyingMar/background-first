require("dotenv").config();

// 数据库地址切换
const MONGODB_URI = `mongodb+srv://zhiying:${process.env.PASSWORD}@cluster0.0eobrga.mongodb.net/${
  process.env.NODE_ENV === "production"
    ? 'message'
    : 'testMessage'
}?retryWrites=true&w=majority`;

// token加密的密钥
const SECRET=process.env.SECRET??'';

//password加密盐值 
const saltRounds=10;
module.exports = {
  MONGODB_URI,
  SECRET,
  saltRounds
};
