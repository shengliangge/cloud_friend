<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-margin-top" style="padding:20rpx 0;">
				<text class="grace-h4 grace-bold">个人中心</text>
			</view>
			<view class="grace-list">
				<view class="grace-list-items">
					<view class="grace-list-image ucenter-face grace-relative">
						<image class="grace-list-image ucenter-face-image" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png"
						 mode="widthFix"></image>
					</view>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="list-title-text">盛良</text>
						</view>
						<view class="grace-list-body-desc">冲刺倒计时</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<view class="ucenter-line"></view>
			<view>
				<graceBoxBanner :items="items"></graceBoxBanner>
			</view>
			<view class="ucenter-line"></view>
			<view class="grace-list grace-margin-top">
				<view class="grace-list-items">
					<text class="items-title">邮箱</text>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">850110183@qq.com</text>
						</view>
					</view>
					<!-- <text class="grace-list-arrow-right grace-icons icon-arrow-right"></text> -->
				</view>
				<view class="grace-list-items">
					<text class="items-title">注册</text>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">2020-10-28 13:20:25</text>
						</view>
					</view>
					<!-- <text class="grace-list-arrow-right grace-icons icon-arrow-right"></text> -->
				</view>
				<view class="grace-list-items">
					<text class="items-title">性别</text>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">男</text>
						</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
				</view>
				<view class="grace-list-items">
					<text class="items-title">生日</text>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">2020-10-28 13:20:25</text>
						</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
				</view>
				<view class="grace-list-items">
					<text class="items-title">电话</text>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">13879016546</text>
						</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
				</view>

				<view class="grace-list-items">
					<text class="items-title">密码</text>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">******</text>
						</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<button type="default" class="grace-button btn-color" @click="toLogin">退出登录</button>
		</view>
	</gracePage>
</template>
<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceBoxBanner from "../../graceUI/components/graceBoxBanner.vue";
	export default {
		data() {
			return {
				data: '',
				items: [
					[80, '', '动态'],
					[100, '', '好友'],
					[50, '', '私信'],
					[8, '', '群组']
				]
			}
		},
		created() {
			this.getUserDetail()
		},
		methods: {
			toLogin() {
				uni.redirectTo({
					url: "/pages/login/login",
				})
			},
			getUserDetail() {
				uni.request({
					url: 'http://127.0.0.1:3000/user/getDetail',
					data: {
						id: "5f99648b0c35b532a037da20",
						data: '123', //旧密码
						type: 'password', //类型
						password: '123456' //新密码
					},
					method: 'POST',
					success: (data) => {
						console.log(data)
					}
				})
			}
		},
		components: {
			gracePage,
			graceBoxBanner
		}
	}
</script>
<style lang="scss">
	.list-title-text {
		font-size: 40rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
	}

	.items-title {
		font-size: 32rpx;
	}

	.btn-color {
		background-color: rgb(255, 228, 49);
	}

	.grace-list-title-text {
		color: #919191;
		padding-top: 8rpx;
		margin-left: 10rpx;
	}

	.ucenter-face {
		width: 100rpx !important;
		height: 100rpx !important;
	}

	.ucenter-face-image {
		width: 100rpx !important;
		height: 100rpx !important;
	}

	.ucenter-line {
		height: 12rpx;
		background-color: #F4F5F6;
		margin: 16rpx 0;
	}
</style>
