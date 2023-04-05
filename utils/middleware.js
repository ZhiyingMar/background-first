const createError = require("http-errors");

// 404问题
const unknownEndpoint = (req, res, next) => {
  next(createError(404));
};

// 问题处理
const errorHandler=(err, req, res, next)=>{
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(1243);
    switch(err.name){
      case 'TokenExpiredError':
        return res.status(401).json({ error: '登录已过期，请重新登录' });
      case 'JsonWebTokenError':
        return res.status(401).json({ error: '登录无效，请重新登录' });
    }
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next(err)
}


module.exports={
    unknownEndpoint,
    errorHandler
}