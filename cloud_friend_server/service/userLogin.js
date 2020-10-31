// 用户登录
const dbServer = require('../dao/dbServer')
const userLogin={}
//登录
userLogin.login = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  dbServer.userMatch(email, password, res);
}
module.exports = userLogin;