// 邮件服务
// 引用发送邮件插件
var nodemailer = require('nodemailer');
var credentials = require('../config/credentials')
// 创建传输方式
var mailTransport = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass,
  },
});

// 注册发送邮件给用户
/* 浏览器输入地址（如127.0.0.1:3000/sned）后即发送 */

exports.emailRegister = (email, res) => {
  var options = {
    from: '850110183@qq.com',
    to: email,
    subject: '友云时光欢迎您',
    html: '<h1>您好，这是一封来自友云的邮件！友云时光欢迎您的加入！我们竭力为您提供更好的聊天体验</h1> <a>点击认证</a>',
  };
  mailTransport.sendMail(options, function (err, msg) {
    if (err) {
      res.send({ code: 200, msg: '邮件发送失败', err })
    }
    else {
      res.send({ code: 500, msg: '邮件发送成功', msg })
    }
  });
}