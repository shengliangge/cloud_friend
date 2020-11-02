<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<!-- 搜索组件宽度自适应于外层 -->
			<view style="padding:25rpx 50rpx; background:#F5F6F7">
				<graceSearch @inputting="inputting" :kwd="searchKey"></graceSearch>
			</view>
			<view class="grace-body">
				<view v-if="searchKeyHistory.length > 0">
					<view class="grace-title" style="margin-top:15rpx;">
						<text class="grace-title-text grace-black">搜索历史</text>
						<text class="grace-text-small grace-gray grace-icons icon-remove" @tap="removeAll">清空</text>
					</view>
					<view class="grace-search-tags grace-wrap">
						<view v-for="(item, index) in searchKeyHistory" :key="index" :data-key="item" class="grace-search-tags-items"
						 @tap="setKey">{{item}}</view>
					</view>
				</view>
			</view>

			<view class="main">
				<view class="search-user result">
					<view class="title">用户</view>
					<view v-for="(item,index) in searchInfo" :key="index">
						<view class="list user">
							<image :src="item.imgUrl"></image>
							<view class="names">
								<view class="name">{{item.nickname}}</view>
								<view class="email">{{item.email}}</view>
							</view>
							<view class="right-bt send">发消息</view>
							<!-- <view class="right-bt add" @click="toUserHome">加好友</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceSearch from "../../graceUI/components/graceSearch.vue";
	import myfun from '../../commons/js/myfun.js'
	export default {
		data() {
			return {
				searchKey: "",
				searchKeyHistory: ['盛良', '850110183@qq.com', '关键字', '类型', ],
				searchInfo: []
			}
		},
		onLoad: function() {},
		methods: {

			toUserHome() {
				uni.navigateTo({
					url: "/pages/userHome/userHome",
				});
			},
			inputting: myfun.Debounce(function(e) {
				if (e.trim().length > 0) { //发起接口请求
					this.$api.searchUser({
						keyword: e.trim()
					}).then(res => {
						if (res.code == 200) {
							const searchInfo = res.result
							for (let searchOne of searchInfo) {
								let id = searchOne._id
								isFriend(id)
							}
						} else {
							wx.showToast({
								title: "网络出现问题，请稍后再试",
								icon: "none"
							});
						}
					})
				}
			}),
			// //判断好友关系
			// isFriend(id) {
			// 	let userInfoId = this.userInfo.id
			// 	let fid = this.uid
			// 	if (userInfoId === fid) { //是自己，不显示添加好友关系
			// 		this.relation = 0
			// 	} else { //如果是好友，也不显示
			// 		this.$api.isFriend({
			// 			uid: userInfoId,
			// 			fid: fid,
			// 			state: 0
			// 		}).then(res => {
			// 			console.log(res)
			// 			if (res.code == 200) { //是好友，查找成功
			// 				this.relation = 1
			// 			} else if (res.code == 400) { //不是好友
			// 				this.relation = 2
			// 			} else {
			// 				wx.showToast({
			// 					title: "网络出现问题，请稍后再试",
			// 					icon: "none"
			// 				});
			// 			}
			// 		})
			// 	}
			// },
			setKey: function(e) {
				let key = e.currentTarget.dataset.key;
				uni.showToast({
					title: '开始搜索 ' + key,
					icon: "none"
				});
				this.searchKey = key;
			},
			removeAll: function() {
				this.searchKeyHistory = [];
			}
		},
		components: {
			gracePage,
			graceSearch
		}
	}
</script>
<style lang="scss">
	.grace-search-tags {
		padding: 10rpx 0;
	}

	.grace-search-tags-items {
		padding: 5rpx 20rpx;
		border-radius: 30rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		font-size: 24rpx;
		line-height: 40rpx;
		border-width: 1px;
		border-style: solid;
		border-color: #F1F1F1;
		color: #A5A7B2;
		font-size: 26rpx;
	}

	.main {
		padding: 0 20rpx;

		.result {
			padding-top: $uni-spacing-col-base;

			.title {
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}

			.list {
				width: 100%;
				padding: 20rpx 0;
				height: 80rpx;

				image {
					float: left;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}
			}

			.names {
				float: left;
				padding-left: $uni-spacing-col-base;
			}

			.name {
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 50rpx;
			}

			.right-bt {
				float: right;
				width: 120rpx;
				height: 48rpx;
				background: $uni-color-primary;
				border-radius: 24rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				;
				line-height: 48rpx;
				margin-top: 16rpx;
				text-align: center;
			}

			.send {
				background: $uni-color-primary;
				color: $uni-text-color
			}

			.add {
				background: rgba(74, 170, 255, 0.1);
				color: $uni-color-success;
			}
		}
	}
</style>
