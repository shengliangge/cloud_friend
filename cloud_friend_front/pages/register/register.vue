<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-body">
			<view class="marginTop">
				<image src="../../static/images/common/logo.png" mode="widthFix" class="logo"></image>
			</view>
			<form @submit="reg" class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item grace-border-b">
					<view class="grace-form-body">
						<input type="text" v-model="form.nickname" class="grace-form-input" placeholder="请输入昵称" />
					</view>
				</view>
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
				<view class="grace-form-item grace-border-b">
					<view class="grace-form-body">
						<input type="password" v-model="form.checkUserpwd" class="grace-form-input" placeholder="确认密码" />
					</view>
				</view>
				<view class="grace-margin-top">
					<button form-type="submit" type="primary" class="grace-button grace-border-radius ">
						注册
					</button>
				</view>
			</form>
			<view class="below" @click="gotoLogin">已有账号，立即登陆</view>
		</view>
	</gracePage>
</template>
<script>
	import gracePage from "../../graceUI/components/gracePage.vue";

	export default {
		data() {
			return {
				form: {
					nickname: "",
					usermail: "",
					userpwd: "",
					checkUserpwd: "",
				}
			}
		},

		methods: {
			reg() {
				// 如果输入框为空或邮箱格式不正确或密码不一致
				if (!this.checkNickname() || !this.isEmail() || !this.checkPwd()) {
					return
				}
				// 检查邮箱是否可用
				this.$api.isExist({
					keyword: this.form.usermail,
					type: 'email'
				}).then(res => {
					console.log(res)
					if (res.code == 200) { //邮箱可使用
						this.register()
					} else { //邮箱不可用或出错
						wx.showToast({
							title: '邮箱不可用',
							icon: "none"
						});
						return false
					}
				}).catch(err => {
					wx.showToast({
						title: "网络出现问题，请稍后再试",
						icon: "none"
					});
				})
			},
			//注册
			register() {
				this.$api.userRegister({
					nickname: this.form.nickname,
					email: this.form.usermail,
					password: this.form.userpwd
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
			
						uni.redirectTo({
							url: "/pages/login/login?usermail=" + this.form.usermail,
						});
					} else {
						wx.showToast({
							title: "网络出现问题，请稍后再试",
							icon: "none"
						});
					}
				}).catch(err => {
					wx.showToast({
						title: "网络出现问题，请稍后再试",
						icon: "none"
					});
				})
			},
			// 验证昵称
			checkNickname() {
				if (this.form.nickname == "") {
					wx.showToast({
						title: "昵称不能为空",
						icon: "none"
					});
					return false
				}
				return true
			},
			// 验证密码
			checkPwd() {
				if (this.form.userpwd == "" || this.form.checkUserpwd == "") {
					wx.showToast({
						title: "密码不能为空",
						icon: "none"
					});
					return false
				}
				if (this.form.checkUserpwd !== this.form.userpwd) {
					wx.showToast({
						title: "密码不一致",
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
					url: "/pages/login/login",
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
