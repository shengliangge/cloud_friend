// 搜索相关
const dbServer = require('../dao/dbServer')

// 用户搜索
exports.searchUser=(req,res)=>{
  let keyword=req.body.keyword
  dbServer.searchUser(keyword,res)
}

// 判断是否为好友
exports.isFriend=function(req,res){
  let uid=req.body.uid;
  let fid=req.body.fid;
  dbServer.isFriend(uid,fid,res)
}


// 群搜索
exports.searchGroup=(req,res)=>{
  let data=req.body.data
  dbServer.searchGroup(data,res)
}

// 判断是否在群内
exports.isInGroup=function(req,res){
  let uid=req.body.uid;
  let gid=req.body.gid;
  dbServer.isInGroup(uid,gid,res)
}