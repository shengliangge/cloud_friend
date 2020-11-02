// method(HTTP 请求方法)，网易云API提供get和post两种请求方式
const GET = 'GET';
const POST = 'POST';
// 定义全局常量baseUrl用来存储前缀
const baseURL = 'http://127.0.0.1:3000';
const token = localStorage.getItem('token')
function request(method, url, data, token="undefined") {
	// console.log(token)
	return new Promise(function(resolve, reject) {
		let header = {
			'Authorization': token
		};
		uni.request({
			url: baseURL + url,
			method: method,
			data: data,
			header: header,
			success(res) {
				//请求成功
				resolve(res.data);
			},
			fail(err) {
				//请求失败
				reject(err)
			}
		})
	})
}

const API = {
	baseURL: 'http://127.0.0.1:3000',
	userRegister: (data) => request(POST, `/user/register`, data), //用户注册
	isExist: (data) => request(POST, `/user/isExist`, data), //判断是否已经存在
	userLogin: (data) => request(POST, `/user/login`, data), //登录
	getDetail: (data) => request(POST, `/user/getDetail`, data, token), //获取用户详情
	isFriend: (data) => request(POST, `/user/isFriend`, data, token), //判断好友关系
	searchUser: (data) => request(POST, `/user/searchUser`, data,token), //搜索用户
};
export default API
