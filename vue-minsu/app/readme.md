


## express 基于Node 简单 轻量 的 web 开发框架 

## 项目启动步骤

## 1.  express -e my-exp

## 2.  cd my-exp

## 3.  npm install

## 4.  npm start

## app === express 涵盖了 express 所有的方法  

## 中间件 

## 中间件本质 就是一个 封装的函数  function  

## 中间件使用有先后顺序之分    后面声明的中间件可以使用前面的中间件  

app.set   设置中间件 
app.use   使用中间件  如果存在这个中间件就直接使用 
app.get
app.post
app.all

req  请求

req.url  路径
req.path 路径
req.query  查询参数 ?
req.params 路由参数 :
req.headers 请求头 
req.body   POST  提交的数据


res 响应 
res.send()
res.json()
res.render()


## session  一段  一场  某段时间    临时会话  

## 用户从登录 到 退出登录  这一段时间  称为session 会话 

## 用户在线 这段时间 保存的数据 存在 对象 对象叫session 



##  token   令牌     后端(加密)生成  发送给前端    

##  前端接收到数据 保存到 storage 网页存储  localStorage sessionStorage   

##  前端 通过 ajax 把 token 加入 请求头 (req.headers) 发送到 后端 后端进行匹配校验 看是否正确  



# 千锋学生管理系统 

# 学生端   ( 登录 +  注册  +  完善个人信息    + 查看自己的违纪  + 提交请假 申请   )
 


# 教师端 (  登录 + 注册  )