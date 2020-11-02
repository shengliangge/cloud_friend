const { send } = require('process');
const dbModel = require('../model/dbModel');  //获取model
const bcrypt = require('../utils/bcrypt')  // 密码加密
const jwt = require('../utils/jwt')  // 引入token
const User = dbModel.model('User')
const Friend = dbModel.model('Friend')
const Group = dbModel.model('Group')  //群
const GroupUser = dbModel.model('GroupUser')  //群成员
const GroupMsg = dbModel.model('GroupMsg')  //群成员
const Message = dbModel.model('Message')  //消息

// 新建用户
exports.createUser = function (nickname, email, pwd, res) {
  let password = bcrypt.encryption(pwd);  // 密码加密
  let data = {
    nickname: nickname,
    email: email,
    password: password,
    registerTime: new Date()
  }
  console.log(data)
  let user = new User(data)
  let back = {}
  user.save((err, result) => {
    if (err) {
      back = {
        code: 500,
        msg: '服务器错误，请稍后再试'
      }
    } else {
      back = {
        code: 200,
        msg: '注册成功'
      }
    }
    res.send(back)
  })

}

// 匹配用户表元素个数
exports.countUserValue = function (keyword, type, res) {
  let whereStr = {}
  whereStr[type] = keyword   //关键词
  let data = {}
  User.countDocuments(whereStr, function (err, result) {
    if (err) {        //出错
      data = {
        code: 500,
        msg: '验证出错'
      }
    } else {
      console.log(result)
      if (result < 1) {      //匹配数小于1，说明之前不存在，没有注册过
        data = {
          code: 200,
          msg: '可使用'
        }
      } else {
        data = {
          code: 400,
          msg: '已经存在'
        }
      }
    }
    res.send(data)
  })
}

//用户登录验证
exports.userMatch = function (email, password, res) {
  // let whereStr = { $or: [{ 'name': email }, { 'email': email }] }
  let whereStr = { 'email': email }   //搜索邮箱字段
  let out = { 'nickname': 1, 'imgUrl': 1, 'password': 1 }       //输出项,1代表输出，0代表不输出
  let data = {}
  User.find(whereStr, out, (err, result) => {
    if (err) {
      data = {
        "code": 500,
        "msg": "服务器错误"
      }
    } else {
      if (result == "") {
        data = {
          "code": 401,
          "msg": "账号不存在"
        }
      } else {
        //找到了，匹配密码
        result.map((e) => {    //result是一个数组
          const pwdMatch = bcrypt.verification(password, e.password); //匹配密码
          if (pwdMatch) {    //密码匹配正确
            let token = jwt.generateToken(e._id);   //生成token
            data = {
              "code": 200,
              userData: {
                id: e._id,
                nickname: e.nickname,
                imgUrl: e.imgUrl,
                token: token
              },
              "msg": "登录成功"
            }
          } else {    //密码错误 
            data = {
              "code": 402,
              "msg": "密码错误"
            }
          }
        })
      }
    }
    res.send(data)
  })
}

// 搜索用户
exports.searchUser = (keyword, res) => {
  let whereStr = {}
  if (keyword !== '全部') {  //如果是全部，就保持默认搜索全部
    //$regex:模糊搜索 
    whereStr = { $or: [{ 'nickname': { $regex: keyword } }, { 'email': { $regex: keyword } }] }
  }
  let out = {
    'nickname': 1,
    'email': 1,
    'imgUrl': 1
  }
  User.find(whereStr, out, (err, result) => {
    let data = {}
    if (err) {
      data = {
        "code": 500,
        "msg": "服务器错误"
      }
    } else {
      data = {
        "code": 200,
        "msg": "搜索成功",
        "result": result
      }
    }
    res.send(data)
  })
}

// 判断是否为好友
exports.isFriend = (uid, fid, state, res) => {
  // 用户id、好友id、是否已经为好友
  let whereStr = { 'userId': uid, "friendId": fid, 'friendStatus': state }
  // 寻找一条
  Friend.findOne(whereStr, (err, result) => {
    if (err) {
      res.send({ code: 500,msg:'服务器错误' })
    } else {
      console.log(result)
      if (result) {
        // 是好友
        res.send({ code: 200,msg:'匹配成功' })
      } else {
        // 不是好友
        res.send({ code: 400,msg:'匹配失败'  })
      }
    }
  })
}
// 搜索群
exports.searchGroup = (data, res) => {
  let whereStr
  if (data = '全部') {
    whereStr = {}
  } else {
    //$regex:模糊搜索 群名
    whereStr = { 'name': { $regex: data } }
  }
  let out = {
    'name': 1,
    'imgUrl': 1
  }
  Group.find(whereStr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 })
    } else {
      res.send({ status: 200, result })
    }
  })
}

// 判断是否在群内
exports.isInGroup = (uid, gid, res) => {
  // 用户id、好友id、是否已经为好友
  let whereStr = { 'userId': uid, "groupId": gid }
  // 寻找一条
  Friend.findOne(whereStr, (err, result) => {
    if (err) {
      res.send({ status: 500 })
    } else {
      if (result) {
        // 在群内
        res.send({ status: 200 })
      } else {
        // 不在群内
        res.send({ status: 400 })
      }
    }
  })
}

// 用户详情
exports.userDetail = (id, res) => {
  console.log(id)
  let whereStr = { '_id': id }
  let out = { 'password': 0 }
  User.findOne(whereStr, out, (err, result) => {
    if (err) {
      res.send({ code: 500, err, "msg": "服务器错误" })
    } else {
      res.send({ code: 200, result, "msg": "获取成功" })
    }
  })
}

//用户修改
exports.userUpdate = (data, res) => {
  //定义修改变量
  let updateStr = {}
  //判断是否有密码
  if (typeof data.password != 'undefined') {  //如果有密码
    User.find({ '_id': data.id }, { 'password': 1 }, (err, result) => {  //通过用户id查找密码
      if (err) {
        data = {
          "code": 500,
          "msg": "服务器错误"
        }
      } else {
        if (result == "") {
          data = {
            "code": 401,
            "msg": "查询失败"
          }
        } else {
          //找到了，匹配密码

          console.log(bcrypt.verification(data.data, result[0].password))
          result.map((e) => {    //result是一个数组
            const pwdMatch = bcrypt.verification(data.data, e.password); //匹配密码
            if (pwdMatch) {    //密码匹配正确
              // 如果修改密码，需要先加密
              if (data.type == 'password') {
                // 密码加密
                let pwd = bcrypt.encryption(data.password);
                console.log('修改的密码', pwd)
                updateStr[data.type] = pwd
              } else {
                updateStr[data.type] = data.data
              }

              // 通过id查找并且修改
              User.findByIdAndUpdate(data.id, updateStr, (err, result) => {
                if (err) {
                  //修改失败
                  res.send({ status: 500 })
                } else {
                  // 修改成功
                  res.send({ status: 200, result })
                }
              })
            } else {
              //密码匹配失败
              res.send({ status: 400 })
            }
          })
        }
      }
    })

  } else {


    //如果没密码：
    updateStr[data.type] = data.data
    User.findByIdAndUpdate(data.id, updateStr, (err, result) => {
      if (err) {
        //修改失败
        res.send({ status: 500 })
      } else {
        // 修改成功
        res.send({ status: 200, result })
      }
    })
  }
}

// 修改好友昵称
exports.friendUpdateNickname = (data, res) => {
  let whereStr = { 'userId': data.uid, 'friendId': data.fid }   //查找项
  let updateStr = { 'markName': data.name }  //修改
  Friend.updateOne(whereStr, updateStr, (err, result) => {
    if (err) {
      //修改失败
      res.send({ status: 500 })
    } else {
      // 修改成功
      res.send({ status: 200, result })
    }
  })
}

// 如果获取昵称成功，就使用好友昵称，如果获取失败，就使用原来的名字
// 获取好友昵称
exports.getMarkName = (data, res) => {
  let whereStr = { 'userId': data.uid, 'friendId': data.fid }   //查找项
  let out = { 'markName': 1 }  //返回好友昵称
  Friend.findOne(whereStr, out, (err, result) => {
    if (err) {
      //获取失败
      res.send({ status: 500 })
    } else {
      // 获取成功
      res.send({ status: 200, result })
    }
  })
}

// 好友操作
// 添加好友表
exports.buildFriend = (uid, fid, friendStatus, res) => {
  let data = {
    userId: uid,
    friendId: fid,
    friendStatus: friendStatus,
    addTime: new Date(),
    lastTime: new Date()
  }
  let friend = new Friend(data)
  friend.save((err, result) => {
    if (err) {
      // res.send({ code: 500 })
    } else {
      // res.send({ code: 200, result })
    }
  })
}
//好友最后通讯时间
exports.upFriendLastTime = function (uid, fid) {
  let whereStr = { $or: [{ 'userId': uid, 'friendId': fid }, { 'userId': fid, 'friendId': uid }] }  //同时修改两个
  console.log(whereStr)
  let updateStr = { 'lastTime': new Date() }
  Friend.updateMany(whereStr, updateStr, (err, result) => {
    if (err) {

      // res.send({ code: 500 })
    } else {
      console.log(result)
      // res.send({ code: 200, result })
    }
  })
}

// 添加一对一消息
exports.insertMsg = (uid, fid, msg, type, res) => {
  let data = {
    userId: uid,
    friendId: fid,
    message: msg,
    msgTypes: type,
    sendTime: new Date(),
    msgState: 1
  }
  let message = new Message(data)
  message.save((err, result) => {
    if (err) {
      // res.send({ code: 500 })
    } else {
      // res.send({ code: 200, result })
    }
  })
}

// 好友申请  
// 判断是否初次申请还是后续申请
exports.applyFriend = (data, res) => {
  //判断是否为已经申请过
  console.log(data)
  let whereStr = { 'userId': data.uid, 'friendId': data.fid }
  Friend.countDocuments(whereStr, (err, result) => {
    if (err) {
      res.send({ code: 500 })
    } else {
      //如果result大于等于0，为初次申请
      if (result == 0) {
        this.buildFriend(data.uid, data.fid, 2)
        this.buildFriend(data.fid, data.uid, 1)
      } else {
        //已经申请过好友
        console.log('111')
        this.upFriendLastTime(data.uid, data.fid)
      }
      // 添加消息
      this.insertMsg(data.uid, data.fid, data.msg, 0, res)
      res.send({ code: 200 })
    }
  })
}


//更新好友状态
exports.updateFriendStatus = (data, res) => {
  let whereStr = { $or: [{ 'userId': data.uid, 'friendId': data.fid }, { 'userId': data.fid, 'friendId': data.uid }] }  //同时修改两个
  Friend.updateMany(whereStr, { 'friendStatus': 0 }, (err, result) => {  //0代表称为好友关系
    if (err) {
      res.send({ code: 500 })
      // res.send({ code: 500 })
    } else {
      res.send({ code: 200, result })
    }
  })
}

//拒绝或删除好友
exports.deleteFriend = (data, res) => {
  let whereStr = { $or: [{ 'userId': data.uid, 'friendId': data.fid }, { 'userId': data.fid, 'friendId': data.uid }] }  //同时修改两个
  Friend.deleteMany(whereStr, (err, result) => {  //0代表称为好友关系
    if (err) {
      res.send({ code: 500 })
      // res.send({ code: 500 })
    } else {
      res.send({ code: 200, result })
    }
  })
}


//按要求获取用户列表
exports.getUsers = (data, res) => {     //根据传入的state可以分别获取好友和正在发送申请的非好友
  let query = Friend.find({})
  // 查询条件
  query.where({ 'userId': data.uid, 'friendStatus': data.state });
  // 查找friendId 关联的user对象
  query.populate('friendId')         //表关联查询
  // 排序方式,最后通讯时间倒序排序
  query.sort({ 'lastTime': -1 })
  // 查询结果
  query.exec().then((e) => {
    // console.log(e)
    let result = e.map((val) => {
      // console.log(val)
      return {
        id: val.friendId._id,
        nickname: val.friendId.nickname,
        markName: val.markName,
        imgUrl: val.friendId.imgUrl,
        lastTime: val.lastTime
      }
    })
    res.send({ code: 200, result })
  }).catch(function (err) {
    res.send({ code: 500, err })
  })
}

//按要求获取一条一对一消息
exports.getOneMsg = (data, res) => {
  let query = Message.findOne({})  //获取一条聊天数据，用于显示在首页
  // 查询条件
  // console.log(data)
  // 最后一条消息有可能是自己发的，也有可能是好友发的，所以是or去查询
  query.where({ $or: [{ 'userId': data.uid, 'friendId': data.fid }, { 'userId': data.fid, 'friendId': data.uid }] })
  // query.where({ 'userId': data.uid, 'friendStatus': data.state });
  // 排序方式,最后消息发送时间倒序排序
  query.sort({ 'sendTime': -1 })
  // 查询结果
  query.exec().then((e) => {
    // console.log(e)
    let result = {
      message: e.message,
      sendTime: e.sendTime,
      msgTypes: e.msgTypes,
    }
    // console.log(result)
    res.send({ code: 200, result })
  }).catch(function (err) {
    res.send({ code: 500, err })
  })
}


//汇总一对一消息未读数
exports.unreadMsg = (data, res) => {
  // 汇总条件 uid,fid
  let whereStr = { 'userId': data.uid, 'friendId': data.fid, 'msgState': 1 }
  Message.countDocuments(whereStr, (err, result) => {
    if (err) {
      res.send({ code: 500 })
    } else {
      console.log(result)
      res.send({ code: 200, result })
    }
  })
}

//一对一消息数修改
exports.updateMsg = (data, res) => {
  // 条件 uid,fid
  let whereStr = { 'userId': data.uid, 'friendId': data.fid, 'msgState': 1 }
  //修改内容
  let updateStr = { 'msgState': 0 }
  //可能有多条需要修改
  Message.updateMany(whereStr, updateStr, (err, result) => {
    if (err) {
      res.send({ code: 500 })
    } else {
      console.log(result)
      res.send({ code: 200, result })
    }
  })
}


// 群操作

// 按要求获取群列表
exports.getGroup = function (uid, res) {
  // 根据用户id获取所在的群
  let query = GroupUser.find({})
  // 查询条件
  query.where({ 'userId': uid });
  // 查找group表 关联的user对象
  query.populate('groupId')         //表关联查询
  // 排序方式,最后时间倒序排序
  query.sort({ 'lastTime': -1 })
  // 查询结果
  query.exec().then((e) => {
    // console.log(e)
    let result = e.map((val) => {
      // console.log(val)
      return {
        groupId: val.groupId._id,
        // nickname: val.groupId.nickname,
        name: val.groupId.name,
        imgUrl: val.groupId.imgUrl,
        lastTime: val.lastTime,
        tip: val.tip
      }
    })
    res.send({ code: 200, result })
  }).catch(function (err) {
    res.send({ code: 500, err })
  })
}


// //按要求获取群消息
// exports.getOneGroupMsg = (gid, res) => {
//   let query = GroupMsg.findOne({})  //获取一条聊天数据，用于显示在首页
//   // 查询条件
//   // console.log(data)
//   // 最后一条消息有可能是自己发的，也有可能是好友发的，所以是or去查询
//   query.where({ 'groupId': gid, })
//   // 关联user表
//   query.populate('userId')
//   // 排序方式,最后消息发送时间倒序排序
//   query.sort({ 'sendTime': -1 })
//   // 查询结果
//   query.exec().then((e) => {
//     // console.log(e)
//     let result = {
//       message: e.message,
//       sendTime: e.sendTime,
//       msgTypes: e.groupMsgTypes,
//       name: e.userId.name
//     }
//     // console.log(result)
//     res.send({ code: 200, result })
//   }).catch(function (err) {
//     res.send({ code: 500, err })
//   })
// }

//汇总一对一消息未读数
exports.unreadGroupMsg = (data, res) => {
  // 汇总条件 uid,fid
  let whereStr = { 'userId': data.uid, 'friendId': data.fid, 'msgState': 1 }
  Message.countDocuments(whereStr, (err, result) => {
    if (err) {
      res.send({ code: 500 })
    } else {
      console.log(result)
      res.send({ code: 200, result })
    }
  })
}

//群消息数修改
exports.updateGroupMsg = (data, res) => {
  // 条件 uid,fid
  let whereStr = { 'userId': data.uid, 'groupId': data.gid }
  //修改内容
  let updateStr = { 'tip': 0 }
  //可能有多条需要修改
  GroupMsg.updateOne(whereStr, updateStr, (err, result) => {
    if (err) {
      res.send({ code: 500 })
    } else {
      console.log(result)
      res.send({ code: 200, result })
    }
  })
}