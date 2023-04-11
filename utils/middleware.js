const createError = require("http-errors");

// 404问题
const unknownEndpoint = (req, res, next) => {
  next(createError(404));
};

// 问题处理
const errorHandler=(err, req, res, next)=>{
    console.log("err===>",err);
    switch(err.name){
      case 'TokenExpiredError':
        return res.status(403).json({ error: '登录已过期，请重新登录' });
      case 'JsonWebTokenError':
        return res.status(401).json({ error: '登录无效，请重新登录' });
    }
    next(err)
}


module.exports={
    unknownEndpoint,
    errorHandler
}