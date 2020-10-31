记录知识点

表：6张表
用户表
id、用户名、邮箱、性别、生日、电话、密码，注册时间、签名、头像链接
好友表
id、用户id、好友id、生成时间、好友状态（0已经为好友、1表示申请中、2表示申请发送方，对方未同意）
聊天消息表
id、发送者id、接收者id、发送内容、内容类型（0表示文字、1表示图片链接、2音频链接。。。）、发送时间、消息状态（0表示已读、1表示未读）
群表 
id、群主id、群名、群封面链接、群公告、群创建时间
群成员表
id、群id、用户id、群内名、加入时间、未读消息数，是否屏蔽群消息（0表示不屏蔽、1代表屏蔽）
群消息表
id、群id、发送者id、发送内容、内容类型（0表示文字、1表示图片链接、2音频链接。。。）、发送时间


跨域解决： cors
密码加密解密：bcryptjs
数据解析：body-parser
token: npm install jsonwebtoken --save
nodemon:npm i nodemon
文件上传： 插件multer     npm install --save multer    data文件夹用来存放数据
 
router  ->   service  -> dao

