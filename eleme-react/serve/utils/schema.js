

// Schema主要用于定义MongoDB中集合Collection里文档document的结构
// Schema 表结构的定义 定义文档的结构和属性  
// 每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
// {username:String,age:Number}

// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组

var mongoose = require("mongoose");
var Schema =  mongoose.Schema;

var users_schema = new Schema({
    username:String,
    mobile:Number,
    password:String,
    dbpwd:String,
    time:Date,
    pic:String,
    uid:Number,
    age:Number,
    word:String,
    address:String
})
exports.User = mongoose.model('user',users_schema);  // user => users 
// 如果需要在Schema定义后添加其他字段，可以使用add()方法



// Model 模型  
// Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为
// Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作
// model是由schema生成的模型，可以对数据库的操作


// 主页优惠区
var youhui_schema=new Schema({
    img:String,
    name:String,
    type:String,
    num:Number,
    pinfen:Number,
    money:Number,
    yunfei:Number,
    lucheng:Number,
    time:Number
})
exports.Youhui=mongoose.model("youhui",youhui_schema)


// main/classify推荐区
var tuijian_schema=new Schema({
    img:String,
    name:String,
    type:String,
    num:Number,
    pinfen:Number,
    money:Number,
    yunfei:Number,
    lucheng:Number,
    time:Number
})
exports.Tuijian=mongoose.model("tuijian",tuijian_schema)


// 菜单
var caidan_schema=new Schema({
    img:String,
    name:String,
    type:String,
    num:Number,
    pinfen:Number,
    money:Number,
    yunfei:Number,
    lucheng:Number,
    time:Number,
    count:Number

})
exports.Caidan=mongoose.model("caidan",caidan_schema)



// 验证码 
var code_schema = new Schema({
    mobile:Number,
    code:Number,
    time:Date,
})

exports.Code = mongoose.model('code',code_schema);

// 头像 
var pic_schema = new Schema({
    mobile:Number,
    pic:String,
    time:Date,
})

exports.Pic = mongoose.model('pic',pic_schema);










var uid_schema = new Schema({
    names:String,
    id:Number
})
exports.Uid = mongoose.model('uid',uid_schema);


var comment_schema = new Schema({
    cid:Number,
    title:String,
    content:String,
    mid:String, // 电影id
    mtitle:String, // 电影标题
    mpic:String,
    uid:Number, // 用户编号
    uname:String, // 用户名
    time:Date
})
exports.Comment = mongoose.model('comment',comment_schema);


var shopcar_schema = new Schema({
    mobile:Number,
    goodId:String,
    good:Object,
    img:String,
    name:String,
    money:Number,
    time:Date,
    count:Number,
    checked:Boolean
})
exports.Shopcar = mongoose.model('shopcar',shopcar_schema);






