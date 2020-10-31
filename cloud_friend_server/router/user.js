// 用户操作相关
const express = require("express");
const api = express.Router();
const emailServer = require('../utils/emailServer')		// 引入邮箱
const register = require('../service/userRegister')   		//注册服务
const login = require('../service/userLogin')  					 //登录服务
const search = require('../service/userSearch')  					 //搜索服务
const detail = require('../service/userDetail');  					 //搜索服务
const friend = require("../service/friend");
const index = require("../service/index");

//注册
api.post('/register', (req, res) => {
	register.register(req, res)
})

//用户或邮箱是否存在
api.post('/isExist', (req, res) => {
	register.isExist(req, res)
})

// 发送邮件
api.post('/mail', (req, res) => {
	let email = req.body.mail
	emailServer.emailRegister(email, res)
})

// 登录
api.post('/login', (req, res) => {
	login.login(req, res)
})

// 用户搜索
api.post('/searchUser', (req, res) => {
	search.searchUser(req, res)
})

// 群搜索
api.post('/searchGroup', (req, res) => {
	search.searchGroup(req, res)
})

// 是否为好友
api.post('/isFriend', (req, res) => {
	search.isFriend(req, res)
})

// 是否在群内
api.post('/isInGroup', (req, res) => {
	search.isInGroup(req, res)
})



//用户详情
api.post('/getDetail', (req, res) => {
	console.log(111)
	detail.userDetail(req, res)
})

//用户信息修改
api.post('/updateUserInfo', (req, res) => {
	detail.userUpdate(req, res)
})

//好友昵称修改
api.post('/updateMarkName', (req, res) => {
	detail.friendMarkName(req, res)
})

//获取好友昵称
api.post('/getMarkName', (req, res) => {
	detail.getMarkName(req, res)
})


//好友申请
api.post('/applyFriend', (req, res) => {
	friend.applyFriend(req, res)
})

//修改好友状态(同意好友)
api.post('/updateFriendStatus', (req, res) => {
	friend.updateFriendStatus(req, res)
})

//拒绝或删除好友
api.post('/deleteFriend', (req, res) => {
	friend.deleteFriend(req, res)
})


// 主页
//获取好友
api.post('/index', (req, res) => {
	index.getFriend(req, res)
})

//获取最后一条消息
api.post('/getLastMsg', (req, res) => {
	index.getLastMsg(req, res)
})
//获取未读消息数
api.post('/getUnreadMsg', (req, res) => {
	index.unreadMsg(req, res)
})

//修改未读消息状态
api.post('/updateMsg', (req, res) => {
	index.updateMsg(req, res)
})

// 群操作
//获取群
api.post('/getGroup', (req, res) => {
	index.getGroup(req, res)
})

//获取最后群一条消息
api.post('/unreadGroupMsg', (req, res) => {
	index.unreadGroupMsg(req, res)
})
//获取群未读消息数
api.post('/updateGroupMsg', (req, res) => {
	index.updateGroupMsg(req, res)
})







module.exports = api;


