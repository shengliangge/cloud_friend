const userSchema = {
  nickname: { type: String },                           //昵称
  password: { type: String },                            //密码
  email: { type: String },                              //邮箱
  sex: { type: String, default: 'asexual' },            //性别，有默认性别
  birth: { type: Date },                                //生日
  phone: { type: String },                              //电话
  explain: { type: String, default: '该用户很懒，还没有签名哟' },                        //签名
  imgUrl: { type: String, default: 'user.png' },         //头像链接，有默认头像
  registerTime: { type: Date },                         //注册时间
}
module.exports = userSchema