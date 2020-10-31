// 用于处理和存储相关的
// 引入附件上传插件
const express = require("express");
const api = express.Router();
const multer = require('multer')
const mkdir = require('../utils/mkdir')    //生成文件夹
// 学习文档路径：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md

// storage   
// 磁盘存储引擎 (DiskStorage)
// 磁盘存储引擎可以让你控制文件的存储。
// 控制文件的存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = req.body.url    //前端传递存放路径,需要先建成文件夹
    mkdir.createMkdir('../data/' + url, err => {   //如果没有对应的文件夹，就生成文件夹，如果有，就延用
      console.log(err)
    });
    let user = req.body.user
    // console.log('user', user)
    cb(null, './data/' + url)     //存放路径
  },
  filename: function (req, file, cb) {
    let name = req.body.name      //文件命名工作交给前端完成
    console.log(name)
    let type = file.originalname.replace(/.+\./, ".")       //正则匹配后缀名
    // console.log(type)
    // console.log('file', file)
    cb(null, name + type)   //文件命名
  }
})

var upload = multer({ storage: storage })
//前端需要上传的东西：例如用户头像、图片头像、聊天音频、图片、视频、文件等

//前端文件上传
api.post('/upload', upload.array('file', 9), function (req, res, next) {
  console.log('文件上传')

  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话

  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  //
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body 将具有文本域数据，如果存在的话
  // 获取文件名
  let name = req.files[0].filename;
  // 返回给前端
  res.send(name)
})

module.exports = api;