const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },       //用户id
  friendId: { type: Schema.Types.ObjectId, ref: 'User' },     //好友id
  message: { type: String },                                        //聊天内容
  sendTime: { type: Date },                                             //发送时间
  msgTypes: { type: Number },                                          //内容类型（0表示文字、1表示图片链接、2音频链接。。。）
  msgState: { type: Number },                                          //消息状态
}
module.exports = messageSchema