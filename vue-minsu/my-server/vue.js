

var express = require("express");
var router = express.Router();
var { Movie, User } = require("./utils/schema");
var axios = require("axios");
var { aesEncrypt, keys } = require("./utils/index")
var multer = require("multer");



router.get("/index", (req, res) => {
    res.send("这是  vue - project 接口 文件")
})

router.get("/movie", (req, res) => {
    var limit = req.query.limit * 1 || 0;
    Movie.find().limit(limit).then(result => {
        res.json({
            msg: "获取电影数据成功...",
            code: 200,
            result
        })
    })
});


// router.post("/register", (req, res) => {
//     const body = req.body;
//     console.log(body);

//     res.send("注册成功....");
// })

router.get("/maizuo/banner", (req, res) => {
    axios({
        url: "https://m.maizuo.com/gateway?type=2&cityId=110100&k=1299209",
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15628358392594160247044","bc":"110100"}',
            'X-Host': 'mall.cfg.common-banner'
        }
    }).then(result => {
        console.log(result.data);

        res.json({
            msg: "获取卖座电影数据",
            code: 200,
            result: result.data
        })
    })
})

router.post("/register", (req, res) => {
    const body = req.body;
    console.log(body);
    //先判断用户名或者手机号是否存在
    User.findOne({
        $or: [
            {
                username: body.username
            },
            {
                mobile: body.mobile
            }
        ]
    }).then(data => {
        if (data) {
            //已经注册过
            res.json({
                code: 200,
                msg: "用户名或者手机已经被注册过",
                result: null,
                type: 0,
            })
        } else {
            //插入
            body.time = new Date();
            User.insertMany(body)
                .then(result => {
                    res.json({
                        code: 200,
                        msg: "注册成功，欢迎登录",
                        type: 1,
                        result
                    })
                })
        }
    })
})

router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body)

    //先查询
    User.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data) {
            if (data.password == body.password) {
                var str = body.mobile + "-" + body.password;
                var token = aesEncrypt(str, keys);
                req.session.token = token;
                req.session.mobile = body.mobile;
                req.session.username = data.username;
                res.json({
                    code: 200,
                    msg: '登录成功',
                    result: data,
                    type: 1,
                    token
                })
            } else {
                res.json({
                    code: 200,
                    msg: "登录失败，手机号或者密码不存在",
                    result: data,
                    type: 0
                })
            }

        } else {
            res.json({
                code: 200,
                msg: '登录失败,手机号不存在',
                result: data,
                type: 0
            })
        }
    })



})

router.get("/getInfo", (req, res) => {
    User.findOne({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            code: 200,
            msg: "获取用户的个人信息成功",
            result
        })
    })
})
//磁盘存储数据
var storage = multer.diskStorage({
    destination(req, file, cd) {
        cd(null, "./public/upload")   //存储到/public/upload
    },
    filename(req, file, cd) {
        console.log(file);

        cd(null, Date.now() + "wh1910" + file.originalname)
    }
})

var upload = multer({ storage: storage }).any() //接受一切文件
//图片上传
router.post("/uploadImg", upload, (req, res) => {

    console.log(req.files[0]);
    var path = req.files[0].path;

    User.updateOne({
        mobile: req.session.mobile
    }, {
        $set: {
            pic: path
        }
    }).then(result => {
        res.json({
            msg: "头像上传成功",
            code: 200,
            pic: path,
            type: 1,
            mobile:req.session.mobile,
            result
        })

    })
})

//根据手机号获取头像
router.post("/getAvatarImg",(req,res)=>{
    User.findOne({
        mobile:req.session.mobile
    }).then(result=>{
        if(result.pic){
            res.json({
                msg: "获取头像成功",
                code: 200,
                result,
                type:1
            })
        }else{
            res.json({
                msg: "获取头像失败",
                code: 200,
                result,
                type:0
            })
        }
     
    })
})
module.exports = router;