// 用户详情
const dbServer = require('../dao/dbServer')

// 显示用户详情
exports.userDetail=function(req,res){
  let id=req.body.id;
  console.log(id)
  dbServer.userDetail(id,res)
}
//用户信息更改
exports.userUpdate=function(req,res){
  let data=req.body
  dbServer.userUpdate(data,res)
}

//修改好友昵称
exports.friendMarkName=function(req,res){
  let data=req.body.data
  dbServer.friendUpdateNickname(data,res)
}

//获取好友昵称
exports.getMarkName=function(req,res){
  let data=req.body.data
  dbServer.friendUpdateNickname(data,res)
}