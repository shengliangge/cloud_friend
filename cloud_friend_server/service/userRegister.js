const dbServer = require('../dao/dbServer')
const emailServer = require('../utils/emailServer')		// 引入邮箱
const userRegister = {}
// 用户注册
userRegister.register = (req, res) => {
  let nickname = req.body.nickname;
  let email = req.body.email;
  let password = req.body.password
  emailServer.emailRegister(email, res)    //发送邮件，第一版本发送欢迎邮件即可，后续版本迭代加入邮箱激活账号
  dbServer.createUser(nickname, email, password, res)
}

// 判断用户或邮箱是否存在
userRegister.isExist = (req, res) => {
  let keyword = req.body.keyword;
  let type = req.body.type;
  dbServer.countUserValue(keyword, type, res)
}
module.exports = userRegister;