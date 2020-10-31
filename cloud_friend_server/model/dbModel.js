const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;
// 表
const user = require('./userSchema')
const friend = require('./friendSchema')
const message = require('./messageSchema')
const group = require('./groupSchema')
const groupUser = require('./groupUserSchema')
const groupMsg = require('./groupMsgSchema')

// 用户表
const userSchema = new Schema(user)
// 好友表
const friendSchema = new Schema(friend)
//消息表
const messageSchema = new Schema(message);
//群表
const groupSchema = new Schema(group);
//群成员表cls
const groupUserSchema = new Schema(groupUser);
//群消息表
const groupMsgSchema = new Schema(groupMsg);

module.exports = db.model('User', userSchema)
module.exports = db.model('Friend', friendSchema)
module.exports = db.model('Message', messageSchema)
module.exports = db.model('Group', groupSchema)
module.exports = db.model('GroupUser', groupUserSchema)
module.exports = db.model('GroupMsg', groupMsgSchema)