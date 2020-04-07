var express = require('express');
var router = express.Router();   // app  > Router 

var {aesDecrypt,keys} = require("../utils");
var {Hotel,User} = require("../utils/schema");
/* GET home page. */

// router 路由模块
// get  请求方式  
// req  请求 request
// res  响应  response 
// next 执行下个中间件 
// render 服务器端渲染  

router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('./index.ejs', { 
      title: '学习',
      word:"很好",
      flag:!!0,
      msg:"这是 express 项目",
      tag:"<h2>Are you OK???? </h2>",
      todo:"多多写代码,逻辑就很清晰了...",
      username:req.session.username,
      teachers:['小英子','帅雷雷','渣潘潘','胖左左']
    });
});


router.get("/about",(req,res)=>{
  res.render("about");
})

router.get("/register",(req,res)=>{
  res.render("register");
})

router.get("/login",(req,res)=>{
    var query = req.query;
    var username = query.username ?  aesDecrypt(query.username,keys) : query.username ;
    res.render("login",{username});   // render  读取 ejs  页面 
})

router.get("/hotel",(req,res)=>{

  // 1  升序
  // -1 降序 
    const query = req.query;
    var sortobj = {};
    var searchObj = {}
    if(query['keyword']){
      var keyword = query['keyword']
      searchObj = {
        $or:[
          {
            title:new RegExp(keyword)
          },
          {
            year:new RegExp(keyword)
          },
          {
            genres:new RegExp(keyword)
          }
        ]
      }
    }else{
      sortobj = query;
    }
    
    if(req.session.username){
      Hotel.find(searchObj,{}).sort(sortobj).then(result=>{
          res.render("hotel",{
            result
          })
      })
      
    }else{
      res.send(`<script>alert('登录session已经失效,请重新登录.');location.href='/login'</script>`)
    }
  
});


router.get("/changepwd",(req,res)=>{
  if(req.session.username){
    res.render('changepwd');
  }else{
    res.send(`<script>alert('登录session已经失效,请重新登录.');location.href='/login'</script>`)
  }  
})

router.post("/resetpwd",(req,res)=>{
    var {
      oldpwd,
      newpwd,
    } = req.body;
    console.log(req.body);

    if(req.session.username){
      User.findOne({
        username:req.session.username,
      }).then(result=>{
        if(result.password == oldpwd){
            User.updateOne({
              username:req.session.username,
            },{
              $set:{
                password:newpwd
              }
            }).then(data=>{
              req.session.destroy();
              res.json({
                code:200,
                msg:"密码修改成功,请重新登录...",
                type:1
              });
            })
        }else{
          res.json({
            code:200,
            msg:'你输入的原始密码错误,请重新输入!',
            type:0
          })
        }
      })
    }else{
      res.send(`<script>alert('登录session已经失效,请重新登录.');location.href='/login'</script>`)
    }  

    
})

router.get('/checkSession',(req,res)=>{
    res.json({
      msg:"检验session 是否存在",
      code:200,
      flag:!!req.session.username ,  // 强制转换数值类型 
      code:!!req.session.username?"3000":"4000"  // 3000 已经登录  4000没有登录
    })
});


router.get("/sendToken",(req,res)=>{
    res.json({
      msg:"发送token到前端",
      code:200,
      token:req.session.token
    })
})

router.get("/checkToken",(req,res)=>{
  console.log(req.headers);
  if(req.headers.token == req.session.token){
      res.json({
        msg:"token 验证成功,登录有效",
        code:"3000",
        flag:true,
      })
  }else{
    res.json({
      msg:"token 验证失败,登录无效",
      code:"4000",
      flag:false,
    })
  }
})









// 退出登录
router.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/");
    })
})




































router.get("/demo",(req,res)=>{
  console.log(req.path);
  res.send("<h2>demo -demode -demo  </h2>")   // send 发送 数据
});

router.get("/todo",(req,res)=>{
  console.log(req.url);
  res.send("这是一个留言板 list - todo ")
});

router.get("/json",(req,res)=>{
  // 返回JSON 数据
  res.json({
      code:200,
      msg:"获取 JSON 数据成功....",
      url:req.url,
      query:req.query, //? 查询参数  (get)
      headers:req.headers  
  })
})

router.get("/emp/:eno",(req,res)=>{
  res.json({
    msg:"获取员工信息...",
    code:200,
    path:req.path,
    url:req.url,
    params:req.params,  //  路由参数 :
  })
})

router.all("/all",(req,res)=>{
  res.send("这是  可能 是一个 get  或者 POST 请求--- all ");
})

router.post("/submit",(req,res)=>{
  console.log(req.body);
    res.json({
      code:200,
      msg:"数据注入成功",
      body:req.body,  // req.body 获取POST 请求提交的参数 
    })
})



module.exports = router;
