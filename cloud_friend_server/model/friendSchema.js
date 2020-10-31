const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },     //用户id
  friendId: { type: Schema.Types.ObjectId, ref: 'User' },   //好友id
  friendStatus: { type: Number },                                        //好友状态（0已经为好友、1表示申请中、2表示申请发送方，对方未同意）
  markName:{type:String},                        //好友昵称
  addTime: { type: Date },                                           //添加时间
  lastTime:{type:Date}                        //最后通讯时间
}
module.exports = friendSchema