// 密码加密模块

const bcrypt = require('bcryptjs')
//生成hash密码
const encryption = (e) => {
  // 生成随机数
  let salt = bcrypt.genSaltSync(10);
  // 生成hash密码
  let hash = bcrypt.hashSync(e, salt);
  return hash
}

// 解密
const verification = (e, hash) => {
  let verify = bcrypt.compareSync(e, hash)
  return verify
}


module.exports = {
  encryption,
  verification
}