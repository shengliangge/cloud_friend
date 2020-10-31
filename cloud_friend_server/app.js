const express = require('express')
const cors = require('cors')   // 解决跨域
const jwt = require('./utils/jwt')
const bodyParser = require('body-parser')   // 引入解析req.body插件
const app = express()
const port = 3000

const userRouter = require('./router/user')   //引入路由
const files = require('./router/files')   //引入路由
app.use(cors())
app.use(bodyParser.json());

// 解析前端数据
// 处理大文件
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50md' }));

// 获取静态路径
app.use(express.static(__dirname + '/data'))
//token白名单
const whiteList = ['/user/login', '/user/register']
app.use((req, res, next) => {
	console.log(req.headers)
	console.log(req.url)
	if (!whiteList.includes(req.url)) {
		let token = req.headers.authorization
		let tokenMatch = jwt.verifyToken(token)
		if (tokenMatch == 1) {  //通过token验证
			console.log('token正确')
			next()
		} else {
			//验证不通过，跳到登录页面
			res.send({ code: 401, msg: 'token验证失败' })
			return
		}
	}
})

// token判断
// app.use((req, res, next) => {
// 	if (typeof (req.body.token) != 'undefined') {
// 		//处理token匹配
// 		let token = req.body.token;

// 		let tokenMatch = jwt.verifyToken(token)
// 		console.log(tokenMatch)
// 		if (tokenMatch == 1) {  //通过token验证
// 			console.log('token正确')
// 			next()
// 		} else {
// 			//验证不通过，跳到登录页面
// 			res.send({ code: 300 })
// 			console.log('失败')
// 			return
// 		}
// 	}
// })
//设置前缀，用户操作相关路由
app.use('/files', files)
app.use('/user', userRouter)
// 404页面
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
})
// 出现错误处理
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.send(err.message)
})
app.listen(port, () => {
	console.log('success');
})
