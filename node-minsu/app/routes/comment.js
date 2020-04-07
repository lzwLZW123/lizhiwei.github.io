
var express = require("express");
var router = express.Router();

var {Comment,Uid,User,Hotel} =require("../utils/schema");
var {dateFormat} = require("../utils")



router.get("/",(req,res)=>{
    res.send("这是 电影评论 路由的模块 ")
});

router.get("/index",(req,res)=>{
    // FindOne 电影Id 
    Hotel.findOne({
        id:req.query.mid,
    }).then(result=>{
        console.log(result);
        req.session.mid = result.id;
        res.render("comment",{result});
    })
    
})

router.post("/submit",(req,res)=>{
    const body = req.body;
    const mid = req.query.mid ;
    console.log(body);
    console.log(mid);  
    Hotel.findOne({
        id:mid
    }).then(hotel=>{
        Uid.updateOne({
            names:"comments"
        },{
            $inc:{
                id:1
            }
        }).then(data=>{
            
            Uid.findOne({
                names:"comments"
            }).then(last=>{
                console.log(last);
                body.mid = hotel.id;
                body.mtitle = hotel.title;
                body.mpic = hotel.images.large;
                body.cid = last.id;
                body.uid = req.session.uid;
                body.uname = req.session.username;
                body.time = new Date();
                Comment.insertMany(body).then(result=>{
                    // res.send("提交评论成功...")
                    res.redirect("/comment/mlist");
                })
            })
        })
    })
})


router.get("/mlist",(req,res)=>{

    // 分页 
    // 当前页码 pageNo
    // 总条数  total
    // 每页显示的条数  pageSize
    // 总页数 totalPage 
    var query = req.query;
    var pageNo = req.query.pageNo * 1  || 1;
    var total = 0;
    var pageSize = req.query.pageSize* 1 || 10;
    var totalPage = 0;

    let obj = {};
    if(query.mid){
        obj.mid = query.mid;
    }
    Comment.find(obj,{}).sort({_id:-1})
    .then(result=>{
        if(result.length>0){
            total = result.length;
            totalPage = Math.ceil(total/pageSize);
            pageNo = pageNo <=1 ? 1 :pageNo; 
            pageNo = pageNo >=totalPage ? totalPage : pageNo;
        }
        Comment.find(obj,{}).sort({_id:-1}).skip((pageNo-1)*pageSize).limit(pageSize)
        .then(data=>{
            data = data.map((item)=>{
                var obj = {...item._doc};
                obj.time =  dateFormat(obj.time);
                return obj
            });
            Hotel.find().then(mv=>{
                res.render("mlist",{
                    result:data,
                    pageNo,
                    total,
                    pageSize,
                    totalPage,
                    mv,
                    username:req.session.username
                });
            })
        })
    })
    
    

    // Comment.find({},{}).sort({_id:-1})
    // .then(result=>{
    //     var list = []
    //     result.forEach(item=>{
    //         // item 只可读不可改 
    //         var obj = {...item._doc}; // 可改写  _doc 可修改 
    //         var time  = dateFormat(obj.time);     //时间格式化处理 
    //         obj.time = time;
    //         list.push(obj);
    //     })
    //     res.render("mlist",{result:list});
    // })
   
})


router.get("/mvdetail",(req,res)=>{
    // 先查询当前这条电影 
    // 再查询当前电影所有的评论 
    var mid = req.query.mid  || "";
    Hotel.findOne({
        id:mid
    }).then(hotel=>{
        Comment.find({
            mid
        },{}).sort({_id:-1})
        .then(comments=>{
            comments = comments.map((item)=>{
                var obj = {...item._doc};
                obj.time =  dateFormat(obj.time);
                return obj
            });
            res.render("mvdetail",{
                hotel,
                comments
            });
        })
    })
})


router.get("/my",(req,res)=>{
    var uid = req.query.uid * 1; 
    Comment.find({
        uid
    }).then(comments=>{
        comments = comments.map((item)=>{
            var obj = {...item._doc};
            obj.time =  dateFormat(obj.time);
            return obj
        });
        User.findOne({
            uid:uid
        }).then(userInfo=>{
            res.render("my",{
                comments,
                userInfo
            });
        })
    })
    
})

router.get('/detail',(req,res)=>{
    var cid =req.query.cid * 1;
    Comment.findOne({
        cid
    }).then(item=>{
        User.findOne({
            uid:item.uidH
        }).then(userInfo=>{
            Hotel.findOne({
                id:item.mid
            }).then(hotel=>{
                console.log(hotel);
                res.render("detail",{
                    item,
                    userInfo,
                    hotel
                });
            })
        })
        
    })
    
})


// 删除一条或者删除所有的数据

router.post("/delComment",(req,res)=>{
    var _id = req.body._id;
    var query  = {};
    if(_id!==-1){
        query._id = _id;   // 删除一条 
    }
    Comment.remove(query).then(result=>{
        res.json({
            msg:"评论删除成功",
            code:200,
            result
        })
    })
})

// 根据 _id 修改 
router.post("/updateComment",(req,res)=>{
    Comment.updateOne({
        _id:req.body._id,
    },{
        $set:{
            title:req.body.title,
            content:req.body.content,
            time:new Date()
        }
    }).then(result=>{
        res.json({
            msg:"评论修改成功",
            code:200,
            result
        })
    })
})


// 上传图片
var multiparty = require("multiparty");
var fs = require("fs");

router.post("/uploadImg",(req,res)=>{
    console.log("upload img");

    const form = new multiparty.Form();  // 表单 name 
    // 设置编码
    form.encoding = "UTF-8";
    // 设置临时文件中转站 
    form.uploadDir = "./uploadtemp";
    // 设置上传图片的最大内存
    form.maxFilesSize = 2*1024*1024;   // 2M

    form.parse(req,function(err, fields, files){
        if(err) throw err;
        // fields 文件域对象
        // files 图片文件 
        console.log(files);
        var uploadUrl = "/images/upload/",
        file = files['filedata'],  // 图片信息 
        originalFilename = file[0].originalFilename,  // 1.jpg 
        tempath = file[0].path;   // 临时的文件路径 
        console.log(file);

        var timestamp = new Date().getTime();  
        uploadUrl += timestamp+originalFilename;   // /images/upload/12342314214521.jpg
        var newPath = "./public"+uploadUrl; // 最终的文件路径 

        // 可读流 可写流
        var fileRead = fs.createReadStream(tempath);
        var fileWrite = fs.createWriteStream(newPath);

        fileRead.pipe(fileWrite)  // pipe 管道输送 数据

        // pipe 监听 关闭 删除临时文件夹里面的图片 
        fileWrite.on("close",()=>{
            fs.unlinkSync(tempath);
            res.json({err:"",msg:uploadUrl}) // msg uploadUrl 
        })
    })
})

module.exports = router;

