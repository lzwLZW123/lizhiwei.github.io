var express = require('express');
var router = express.Router();

var {User,Uid} = require("../utils/schema");

var {aesEncrypt,keys} = require("../utils");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 注册 

router.post("/register",(req,res)=>{
    var body = req.body;
    console.log(body);

    // 注册逻辑 
    // 先查询 判断 username 是否存在  
    // 如果存在  就直接返回 用户名已经存在
    // 如果不存在 就直接插入 

    User.findOne({
        username:body.username
    }).then(result=>{
        if(result){
          res.send(`<script>alert("用户名已经存在,请重新注册");location.href='/register'</script>`)
        }else{
          
          Uid.updateOne({
            names:"users"
          },{
            $inc:{
              id:1
            }
          }).then(data=>{
              Uid.findOne({
                names:"users"
              }).then(last=>{
                console.log(data);
                body.time = new Date();
                body.uid = last.id;
                User.insertMany(body).then(data=>{
                  res.send(`<script>alert("注册成功,立即跳转登录页面...");location.href='/login?username=${aesEncrypt(body.username,keys)}'</script>`)
                })
              })
          })
        }
    })
    
    // res.send("注册成功...");
})




// login 登录逻辑

router.post("/login",(req,res)=>{
    var body = req.body;
    console.log(body);

    User.findOne({
      username:body.username
    }).then(result=>{
      console.log(result);
       if(result){
        if(result.password == body.password){
          req.session.username = result.username;
          req.session.uid = result.uid;
          req.session.mobile = result.mobile;
          req.session.token = aesEncrypt(result.username,keys);
          res.redirect("/");
        }else{
          res.send(`<script>alert("用户名或者密码错误,请重新登录");location.href='/login'</script>`)
        }
       }else{
        res.send(`<script>alert("用户名不存在,请重新登录");location.href='/login'</script>`)
       }
    });

})
















router.get("/demo",(req,res)=>{
  res.send("<h2>wuhan1910 daydayup</h2>")
})


router.get("/like",(req,res)=>{
    res.send("爱就要大声说出来....");

})


module.exports = router;
