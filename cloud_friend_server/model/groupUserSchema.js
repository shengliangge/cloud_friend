const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupUserSchema = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },             //用户id
  groupId: { type: Schema.Types.ObjectId, ref: 'Group' },          //群id
  name: { type: String },                                           //群内名称
  tip: { type: Number, default: 0 },                                //未读消息数
  joinTime: { type: Date },                                             //加入时间
  lastTime: { type: Date },                    //最后通讯时间
  shield: { type: Number, default: 0 },                                         //是否屏蔽群消息（0：否，1：是）
}
module.exports = groupUserSchema 