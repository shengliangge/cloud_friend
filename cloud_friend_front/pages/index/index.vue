<template>
	<view class="content">
		<!-- 头部 -->
		<view class="top-bar">
			<view class="top-bar-left" @click="toUserHome">
				<image :src="user.imgUrl"></image>
			</view>
			<view class="top-bar-center">
				<view class="logo">
					<image src="../../static/images/common/logo.png"></image>
				</view>
			</view>
			<view class="top-bar-right">
				<view class="search" @click="toSearch()">
					<image src="../../static/images/index/search.png"></image>
				</view>
				<view class="add">
					<image @click="toUserHome" src="../../static/images/index/add.png"></image>
				</view>
			</view>
		</view>
		<gracePage :customHeader="false">
			<!-- 页面主体 -->
			<view class="grace-body" slot="gBody">
				<view class="grace-title grace-margin-top">
					<view class="grace-title-border"></view>
					<text class="grace-title-text grace-blue">消息中心</text>
					<text class="grace-text-small grace-gray">cloud-friends</text>
				</view>
				<view class="grace-list" v-for="(item,index) in friends" :key="index">
					<navigator class="grace-list-items">
						<view class="grace-list-image grace-relative">
							<image class="grace-list-image" :src="item.imgurl" mode="widthFix"></image>
							<!-- 提醒 -->
							<view class="grace-badge-point"></view>
						</view>
						<view class="grace-list-body grace-border-b">
							<view class="grace-list-title">
								<text class="grace-list-title-text">{{item.name}}</text>
								<text class="grace-list-title-desc">{{item.time}}</text>
							</view>
							<view class="grace-list-body-desc">{{item.news}}</view>
						</view>
						<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
					</navigator>
				</view>

			</view>
		</gracePage>
	</view>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import datas from '../../commons/js/datas.js'
	export default {
		data() {
			return {
				friends: [],
				user: {}
			}
		},
		onShow() {
			this.getFriends();
		},
		onLoad() {
			this.getStorages()
		},
		methods: {
			//获取本地缓存用户信息
			getStorages() {
				try {
					const user = uni.getStorageSync('user');
					if (user) {
						// user.imgUrl = this.$api.baseURL + /user/ + user.imgUrl
						this.user = user
					} else {
						//如果没有缓存信息，就跳去登录页面
						this.toLogin()
					}
				} catch (e) {
					console.log(e)
					this.toLogin()
				}
			},
			// 跳转用户详情
			toUserDetails() {
				uni.navigateTo({
					url: "/pages/userDetails/userDetails",
				});
			},
			//跳转搜索
			toSearch() {
				uni.navigateTo({
					url: "/pages/search/search",
				});
			},
			// 跳转用户主页
			toUserHome() {
				uni.navigateTo({
					url: "/pages/userHome/userHome?uid=" + this.user.id,
				});
			},
			toLogin() {
				uni.redirectTo({
					url: "/pages/login/login",
				});
			},
			getFriends() {
				this.friends = datas.friends()
				for (let friend of this.friends) {
					friend.imgurl = '../../static/images/img/' + friend.imgurl
					// console.log(friend.imgurl)
				}
				uni.request({
					url: 'http://127.0.0.1:3000/user/updateMsg',
					data: {
						uid: '5f99648b0c35b532a037da20',
						fid: "5f9997b711c5b2a468e3b176",
						// state: 1
					},
					method: 'POST',
					success: (data) => {
						// console.log(data)
					}
				})
			}
		},
		components: {
			gracePage
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: var(--status-bar-height);
		padding-bottom: 32rpx;
	}

	.top-bar {
		position: fixed;
		top: 0;
		display: flex;
		align-items: center;
		z-index: 100;
		width: 100%;
		height: 88rpx;
		margin-top: var(--status-bar-height);
		padding-right: $uni-spacing-col-base;
		padding-left: $uni-spacing-col-base;
		box-sizing: border-box;
		background: $uni-bg-color;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);

		.top-bar-left {
			width: 68rpx;
			display: flex;
			align-items: center;

			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}

		.top-bar-center {
			flex: 1;
			text-align: center;

			image {
				width: 68rpx;
				height: 68rpx;
			}

		}

		.top-bar-right {
			display: flex;
			align-items: center;
			width: 140rpx;

			.search {
				width: 52rpx;
				height: 52rpx;
				margin-right: 40rpx;
			}

			.add {
				width: 52rpx;
				height: 52rpx;
			}

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.grace-body {
		margin-top: 88rpx;
	}
</style>
