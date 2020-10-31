// 主页
const dbServer = require('../dao/dbServer')

// 获取好友列表
exports.getFriend = function (req, res) {
  let data = req.body
  dbServer.getUsers(data, res)
}

// 获取最后一条消息,用于主页显示
exports.getLastMsg = function (req, res) {
  let data = req.body
  dbServer.getOneMsg(data, res)
}

// 获取未读消息数
exports.unreadMsg = function (req, res) {
  let data = req.body
  dbServer.unreadMsg(data, res)
}
//修改未读消息状态
exports.updateMsg = function (req, res) {
  let data = req.body
  dbServer.updateMsg(data, res)
}

// 群操作
// 获取最后一条消息,用于主页显示
exports.getGroup = function (req, res) {
  let uid = req.body.uid
  dbServer.getGroup(uid, res)
}

// 获取未读消息数
exports.unreadGroupMsg = function (req, res) {
  let data = req.body
  dbServer.unreadGroupMsg(data, res)
}
//修改未读消息状态
exports.updateGroupMsg = function (req, res) {
  let data = req.body
  dbServer.updateGroupMsg(data, res)
}