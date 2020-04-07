

const crypto = require("crypto");   // Node 自带API 

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;  // 密文  
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;  // 明文 
}

const keys = "wuhan1910";   //   zklabc ==> zklabcwuhan1910 

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 



exports.checkIsLogin = function(req,res,next){
    if(req.session.username){

    }else{
        
    }
}


exports.dateFormat = function(date){
    var value = new Date(date);
    var year = value.getFullYear();
    var month = value.getMonth() +1;
    var day = value.getDate();
    var hour= value.getHours();
    var min = value.getMinutes();
    var sec = value.getSeconds();
    // console.log( `${year}-${month}-${day} ${hour}:${min}:${sec}`)
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}   