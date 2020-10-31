// method(HTTP 请求方法)，网易云API提供get和post两种请求方式
const GET = 'GET';
const POST = 'POST';
// 定义全局常量baseUrl用来存储前缀
const baseURL = 'http://127.0.0.1:3000';

function request(method, url, data,token) {
	return new Promise(function(resolve, reject) {
		let header = {
		'Authorization': token
		};
		console.log(token)
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
	getDetail: (data,token) => request(POST, `/user/getDetail`, data,token), //登录
};
export default API
