

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
    uid:Number,
    pic:String,


    age:Number,
    word:String,
    address:String
})

// 如果需要在Schema定义后添加其他字段，可以使用add()方法



// Model 模型  
// Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为
// Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作
// model是由schema生成的模型，可以对数据库的操作


exports.User = mongoose.model('user',users_schema);  // user => users 


var wh1910_schema = new Schema({
    names:String,
    password:String,
    time:Date
})

exports.Wuhan1910 = mongoose.model('wuhan1910',wh1910_schema)


var movie_schema = new Schema({
    title:String,
    genres:Array,
    year:String,
    rating:Object,
    id:String,
    casts:Array,
    directors:Array,
    images:Object
})

exports.Movie = mongoose.model('movie',movie_schema);


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
