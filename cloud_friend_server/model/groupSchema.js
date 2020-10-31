const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = {
  userId: { type: Schema.Types.ObjectId, ref: 'User' },     //用户id
  groupName: { type: String},   //群名称
  groupImgUrl: { type: String, default: 'group.png' },    //群头像链接，有默认头像
  createTime: { type: Date },                                           //创建时间
  notice: { type: String },                                        //公告
  
}
module.exports = groupSchema