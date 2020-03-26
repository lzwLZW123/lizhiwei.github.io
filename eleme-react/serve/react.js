var express = require("express");
var router = express.Router();
const multer = require("multer")

// import {LiuYan} from "./utils/schema"
var { LiuYan, Code, Youhui, Tuijian, Pic,Caidan,Shopcar} = require("./utils/schema")
var { sendCode } = require("./aly")
// var {getResult} =require("./config");
var { createToken, getMobile } = require("./utils/token");

router.get("/index", (req, res) => {
    res.json({
        msg: "测试 react api 接口 ",
        code: 200
    })
})

router.post("/getMobile",(req,res)=>{
    var token = req.headers.token; 
    console.log(token)
    if(token){
        decodeToken(token).then(result=>{
            res.json({
                code:200,
                msg:"token 验证成功",
                result:result,
                type:1,
            })
        }).catch(err=>{
            res.json({
                code:"3000",
                msg:"token 验证失败",
                err,
                type:0,
            })
        })
    }else{
        res.json({
            code:"3000",
            msg:"token不存在,请重新登录",
            type:0
        })
    }
})





//头像
// 磁盘存储数据 
var storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./public/upload");  // 存储到 /public/upload
    },
    filename(req, file, cb) {

        cb(null, Date.now() + "wh1910" + file.originalname);
    }
})
var upload = multer({ storage: storage }).any();  // 接收任何格式的文件

router.post("/uploadImg", upload, (req, res) => {
    console.log(req.files[0]);
    var path = req.files[0].path;   // 上传的图片路径
    var time = new Date();
    getMobile(req, res, (mobile) => {
        Pic.insertMany({
            mobile,
            pic: path,
            time
        }).then(result => {
            res.json({
                code: 200,
                msg: "头像上传成功",
                pic: path,
                mobile,
                type: 1
            })
        })
    })
})

router.post("/getlastPic", (req, res) => {
    getMobile(req, res, (mobile) => {
        Pic.findOne({
            mobile
        }).sort({ _id: -1 }).then(result => {
            if (result) {
                return res.json({
                    code: 200,
                    msg: "获取最新头像成功",
                    result,
                    type: 1
                })
            } else {
                return res.json({
                    code: 200,
                    msg: "用户暂无头像",
                    result,
                    type: 0
                })
            }
        })
    })
})





// //获取主页优惠商品列表
// router.get("/youhui", (req, res) => {
//     var limit = req.query.limit * 1 || 0;
//     Youhui.find({}).limit(limit).then(result => {
//         console.log(result)
//         res.json({
//             code: 200,
//             msg: "获取商品列表成功",
//             result
//         })
//     })
// })

// //获取main/classify推荐商品列表
// router.get("/tuijian", (req, res) => {
//     var limit = req.query.limit * 1 || 0;
//     Tuijian.find({}).limit(limit).then(result => {
//         console.log(111)
//         console.log(result)
//         res.json({
//             code: 200,
//             msg: "获取商品列表成功",
//             result
//         })
//     })
// })


router.get("/youhui",(req,res)=>{
    var limit = req.query.limit * 1 || 0 ;
    var keyword = req.query.keyword;
    var obj = {};
    if(keyword){
        obj = {
            $or:[
                {
                    name:new RegExp(keyword)
                }
            ]
        }
    }
    Youhui.find(obj,{}).limit(limit).then(result=>{
        res.json({
            code:200,
            msg:"获取商品列表成功",
            result
        })
    })
});


router.get("/tuijian",(req,res)=>{
    var limit = req.query.limit * 1 || 0 ;
    var keyword = req.query.keyword;
    var obj = {};
    if(keyword){
        obj = {
            $or:[
                {
                    name:new RegExp(keyword)
                }
            ]
        }
    }
    Tuijian.find(obj,{}).limit(limit).then(result=>{
        res.json({
            code:200,
            msg:"获取商品列表成功",
            result
        })
    })
})


// //获取detail菜单列表
router.get("/caidan", (req, res) => {
    var limit = req.query.limit * 1 || 0;
    Caidan.find({}).limit(limit).then(result => {
        console.log(111)
        console.log(result)
        res.json({
            code: 200,
            msg: "获取商品列表成功",
            result
        })
    })
})

router.get("/getGoodById",(req,res)=>{
    Caidan.findOne({
        _id:req.query.goodId
    },{}).then(result=>{
        res.json({
            code:200,
            msg:"获取商品详情成功",
            result
        })
    })
})


// 加入购物车 逻辑 

router.get("/addCart",(req,res)=>{
    const  {
        count,
        goodId,
        mobile,
        img,
        name,
        money
    }  = req.query;
    // const  {
    //     count,
    //     goodId,
    //     good
    // }  = req.body;
    console.log(req.query)
        Shopcar.findOne({
            mobile,
            goodId
        }).then(result=>{
            if(result){
                Shopcar.updateOne({
                    mobile,
                    goodId
                },{
                    $inc:{
                        count:count
                    },
                    $set:{
                        time:new Date()
                    }
                }).then(data=>{
                    res.json({
                        code:200,
                        msg:'购物车商品数量更新成功',
                        result:data
                    })
                })
            }else{
                Shopcar.insertMany({
                    mobile,
                    count,
                    time:new Date(),
                    goodId,
                    img,
                    name,
                    money
                }).then(data=>{
                    res.json({
                        code:200,
                        msg:'购物车新增商品成功',
                        result:data
                    })
                })
            }
    })
})









// 查询 
router.get("/getCarList",(req,res)=>{
    // getMobile(req,res,mobile=>{
        Shopcar.find().then(result=>{
            // console.log(result)
            res.json({
                code:200,
                msg:"获取购物车列表成功",
                result
            })
        })
    // })
})


// 修改 
// 修改是否选中 1条选中  全部选中
router.post("/changeChecked",(req,res)=>{
    const {
        checked,
        goodId
    } = req.body; 
    getMobile(req,res,mobile=>{
        var obj = {mobile};
        if(goodId){
            obj = {
                mobile,
                goodId
            }
        }
        Shopcar.updateMany(obj,{
            $set:{
                checked:checked 
            }
        }).then(result=>{
            res.json({
                code:200,
                msg:goodId?"修改单条选中成功":"修改全部选中成功",
                result
            })
        })
    })
})

router.post("/changeCount",(req,res)=>{
    const {
        goodId,
        count,
        flag
    } = req.body; 

    getMobile(req,res,mobile=>{
        var obj = {}
        if(count){
            obj = {
                $set:{
                    count
                }
            }
        }else{
            obj = {
                $inc:{
                    count:flag?1:-1
                }
            }
        }
        Shopcar.updateOne({
            goodId,
            mobile
        },obj).then(result=>{
            res.json({
                code:200,
                msg:"修改商品数量成功",
                result
            })
        })

    })
})

// 删除 
router.post("/delSelect",(req,res)=>{
    getMobile(req,res,mobile=>{
        Shopcar.deleteMany({
            mobile,
            checked:true
        }).then(result=>{
            res.json({
                code:200,
                msg:"删除购物车商品成功",
                result
            })
        })
    })
})

























function getCode() {
    return 1000 + Math.floor((10000 - 1000) * Math.random())
}

// 发送 
// router.post("/aly/sendSms",(req,res)=>{
//     var {mobile} = req.body;
//     const code = getCode();
//     if(!mobile){
//         res.json({
//             code:200,
//             msg:"请先输入手机号"
//         })
//     }

//     sendCode(mobile,code).then(result=>{
//         console.log(result);   // result.Code = "OK"
//         if(response.data.code=="OK"){
//             Code.inserMany({
//                 mobile,
//                 code,
//                 time:new Date()
//             }).then(result=>{
//                 res.json({
//                     code:200,
//                     msg:"验证码发送成功",
//                     param:code,
//                     type:1,
//                     result
//                 })
//             })
//         }else{
//             res.json({
//                 code:200,

//                 param:code,
//                 msg:"验证发送失败",

//             })
//         }

//     }).catch(err=>{
//         res.json({
//             code:200,
//             param:code,
//             msg:"服务器错误",

//         })
//     })
// })
router.post("/aly/sendSms", (req, res) => {
    var { mobile } = req.body;
    const code = getCode();
    if (!mobile) {
        res.json({
            code: 200,
            msg: "请先输入手机号"
        })
    }

    Code.insertMany({
        mobile,
        code,
        time: new Date()
    }).then(result => {
        res.json({
            code: 200,
            msg: "验证码发送成功",
            param: code,
            type: 1,
            result
        })
    })


    sendCode(mobile, code).then(result => {
        console.log(result);   // result.Code = "OK"
        res.json({
            code: 200,
            result: result,
            param: code,
            msg: "验证发送成功"
        })
    })
})

router.post("/checkCode", (req, res) => {
    var {
        mobile,
        code
    } = req.body;
    Code.findOne({
        mobile,
        code
    }).then(result => {
        if (result) {
            var time = new Date();

            if (time - result.time < 60 * 1000) {
                var token = createToken(mobile);
                return res.json({
                    code: 200,
                    msg: "验证码有效",
                    type: 1,
                    token,
                })
            } else {
                return res.json({
                    code: 200,
                    msg: "验证码过期",
                    type: 0
                })
            }
        } else {
            return res.json({
                code: 200,
                msg: "验证码错误",
                type: 0
            })
        }
    })
})


module.exports = router;