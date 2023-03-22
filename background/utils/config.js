require("dotenv").config();

// 数据库地址切换
const MONGODB_URI = `mongodb+srv://zhiying:${process.env.PASSWORD}@cluster0.0eobrga.mongodb.net/${
  process.env.NODE_ENV === "test"
    ? 'message'
    : 'testMessage'
}?retryWrites=true&w=majority`;
module.exports = {
  MONGODB_URI,
};
