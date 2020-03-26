

const express = require("express");
const app = express();
const hostname = "0.0.0.0";
const port = 2000;
 //导入http服务
// const http = require("http");
// const server = http.createServer(app);

// 导入https服务
var http = require("http");
var https = require('https');
var fs = require("fs");
// 第一步：https
var privateKey  = fs.readFileSync('./cert/lzw.key', 'utf8');  
var certificate = fs.readFileSync('./cert/lzw.pem', 'utf8');  
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);   // https
var httpServer = http.createServer(app);   // http

const connection = require("./utils/connect");
const session=require("express-session");
const path=require("path"); //Node  自带的模块

// cors 解决跨域问题 
var cors = require("cors");
app.use(cors());

app.use(express.json());  // 获取 POST 请求的 FormData  $.POST 
app.use(express.urlencoded({ extended: false }));  // 表单 Form  action  name   req.body 
app.use(express.static(path.join(__dirname, 'public'))); // 静态目录 __dirname 根目录   public 拆分到 根目录


// 注意位置  设置session
app.use(session({
    name:"AppText",
    cookie:{maxAge:1000*60*60},  // 时长 60min 
    secret:"test",
    resave:false,
    saveUninitialized:true
  }))

app.get("/index",(req,res)=>{
    res.send("这是一个 前后端分离的后端服务器 .. ")
});



app.get("/demo/:uid",(req,res)=>{
    res.json({
        msg:"demo-demo -demo",
        headers:req.headers,
        query:req.query,
        params:req.params,
        path:req.path,
        url:req.url,
        body:req.body
    });
})

var {checkToken}=require("./utils");
// app.use(checkToken); //配置校验 token 的中间件

// var vueRouter = require("./vue");
// app.use("/vue",vueRouter);   // /vue 路由别名  

var reactRouter = require("./react");
app.use("/react",reactRouter);   // /vue 路由别名  





// server.listen(port,hostname,()=>{
//     console.log(`my server is running  at http://${hostname}:${port}`)
// })

httpsServer.listen(port,hostname,()=>{
    console.log(`my server is running  at http://${hostname}:${port}`)
})