// token

// 引入token
const jwt = require('jsonwebtoken')
let secret = '友云时光'
// 生成token
exports.generateToken = function (id, res) {
  let payload = { id: id, time: new Date() }
  let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 120 })   //设置过期时间
  return token
}

//解码token
exports.verifyToken = function (e) {
  let payload 
  jwt.verify(e, secret,(err,result)=>{
    if(err){
      payload=0   //匹配错误
    }else{
      payload=1  //匹配正确
    }
  });
  return payload
}