const createError = require("http-errors");

// 404问题
const unknownEndpoint = (req, res, next) => {
  next(createError(404));
};

// 问题处理
const errorHandler=(err, req, res, next)=>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}


module.exports={
    unknownEndpoint,
    errorHandler
}