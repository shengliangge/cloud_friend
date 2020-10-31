const dbServer = require('../dao/dbServer')

// 好友申请
exports.applyFriend = (req, res) => {
  let data = req.body
  dbServer.applyFriend(data, res)
}

//更新好友状态
exports.updateFriendStatus = (req, res) => {
  let data = req.body;
  dbServer.updateFriendStatus(data, res)
}

// 拒绝或删除好友
exports.deleteFriend = (req, res) => {
  let data = req.body;
  dbServer.deleteFriend(data, res)
}