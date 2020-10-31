<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-body">
			<view class="marginTop">
				<image src="../../static/images/common/logo.png" mode="widthFix" class="logo"></image>
			</view>
			<form @submit="login" class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item grace-border-b">
					<view class="grace-form-body">
						<input type="text" v-model="form.usermail" class="grace-form-input" placeholder="请输入邮箱" />
					</view>
				</view>
				<view class="grace-form-item grace-border-b">
					<view class="grace-form-body">
						<input type="password" v-model="form.userpwd" class="grace-form-input " placeholder="请输入密码" />
					</view>
				</view>

				<view class="grace-margin-top">
					<button form-type="submit" type="primary" class="grace-button grace-border-radius ">
						登陆
					</button>
				</view>
			</form>
			<view class="below" @click="gotoLogin">没有账号，立即去注册</view>
		</view>
	</gracePage>
</template>
<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {
				form: {
					usermail: "",
					userpwd: "",

				},
				tokenTest: ''
			}
		},
		onLoad: function(e) {
			if (e.usermail) {
				this.form.usermail = e.usermail
				wx.showToast({
					title: "注册成功,欢迎您",
					icon: "none"
				});
			}
		},
		methods: {
			// 登录
			login() {
				// 如果不是邮箱或者密码为空
				if (!this.isEmail() || !this.checkPwd()) {
					return
				}
				this.$api.userLogin({
					email: this.form.usermail,
					password: this.form.userpwd
				}).then(res => {
					if (res.code == 200) { //登录成功
						// 本地存储用户信息
						try {
							uni.setStorageSync('user', res.userData)
						} catch (e) {
							console.log('数据存储出错')
						}
						this.toIndex()
					} else {
						wx.showToast({
							title: res.data.msg,
							icon: "none"
						});
						return;
					}
				})
			},
			// 跳转首页
			toIndex() {
				uni.redirectTo({
					url: "/pages/index/index",
				});
			},
			// 验证密码
			checkPwd() {
				if (this.form.userpwd == "") {
					wx.showToast({
						title: "密码不能为空",
						icon: "none"
					});
					return false
				}
				return true
			},
			// 验证邮箱
			isEmail() {
				if (this.form.usermail == "") {
					wx.showToast({
						title: "邮箱不能为空",
						icon: "none"
					});
					return false
				}
				let email = this.form.usermail;
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if (!reg.test(email)) {
					wx.showToast({
						title: "邮箱格式不正确",
						icon: "none"
					});
				}
				return reg.test(email)
			},
			// 跳转到登陆页面
			gotoLogin() {
				uni.redirectTo({
					url: "/pages/register/register",
				});
			}
		},
		components: {
			gracePage
		}
	}
</script>
<style>
	.marginTop {
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
	}

	.logo {
		width: 250rpx;
		height: 68rpx;
	}

	.grace-form-input {
		text-align: left;
	}

	.grace-form-item {
		padding: 10rpx 0;
	}

	.below {
		text-align: center;
		margin-top: 80rpx;
		color: #6f6f6f;
	}
</style>
