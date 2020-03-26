const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI4Fvzr52ug7ghWu33XoF4',
  accessKeySecret: '6PUB3TPMbysfUMGXHYlQHho3YUw9u1',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

// 调用 阿里云 后台发送验证码到手机 
exports.sendCode = function(mobile,code){
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers":mobile,
        "SignName":"自学之家",
        "TemplateCode":'SMS_181851445',
        "TemplateParam":'{code:'+code+'}'   // 最大bug
      }
      
      var requestOption = {
        method: 'POST'
      };

      return client.request('SendSms',params,requestOption)
}


