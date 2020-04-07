var createError = require('http-errors');    // httpError 模块
var express = require('express');     
var path = require('path');  // Node 自带模块 
var cookieParser = require('cookie-parser');  // 处理服务器 cookies
var logger = require('morgan');   // 处理日志  

var indexRouter = require('./routes/index');   // 服务器路由 
var usersRouter = require('./routes/users');   
var commentRouter = require('./routes/comment');

var app = express();   // 泛指 express 所有的方法和属性的集合 

var connection = require("./utils/connect");

var session = require("express-session");


// view engine setup
app.set('views', path.join(__dirname, 'views'));  // __dirname 根目录   views 拆分到 根目录 
app.set('view engine', 'ejs');  // 设置模块引擎 

app.use(logger('dev'));   // 添加日志中间件 
app.use(express.json());  // 获取 POST 请求的 FormData  $.POST 
app.use(express.urlencoded({ extended: false }));  // 表单 Form  action  name   req.body 
app.use(cookieParser());  // 处理cookies 
app.use(express.static(path.join(__dirname, 'public'))); // 静态目录 __dirname 根目录   public 拆分到 根目录


app.use(function(req,res,next){
    console.log("this is my first 中间件 middleware ")
    next();
})

// 注意位置  设置session
app.use(session({
  name:"AppText",
  cookie:{maxAge:1000*60*60},  // 时长 60min 
  secret:"test",
  resave:false,
  saveUninitialized:true
}))

// 路由中间件 设置路由别名  避免路由命名冲突 
app.use('/', indexRouter);   // 浏览器  中间件别名 + path 
app.use('/users', usersRouter);

app.use(function(req,res,next){
  if(req.session.username){
    next();
  }else{
    res.send(`<script>alert('登录session已经失效,请重新登录.');location.href='/login'</script>`) 
  }
});

app.use("/comment",commentRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next 进入执行下一个中间件 
  console.log(404); 
  next(createError(404));
});


app.use(function(err,req,res,next){
  console.log(" wuhan1910 learn more express  ")
  next(err);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("./views/error.ejs")
  res.render('error');    // SSR 服务器端渲染 

});

module.exports = app;
