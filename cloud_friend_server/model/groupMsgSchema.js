const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMsgSchema = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },       //用户id
  groupId: { type: Schema.Types.ObjectId, ref: 'Group' },     //群id
  groupMsg: { type: String },                                        //聊天内容
  groupMsgTypes: { type: Number },                                          //内容类型（0表示文字、1表示图片链接、2音频链接。。。）
  sendTime: { type: Date },                                             //发送时间
}
module.exports = groupMsgSchema