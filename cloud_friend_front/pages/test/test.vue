<template>
	<view>
		<view class="test" @click="upload">上传图片</view>
		<image v-for='(item,index) in img' :key='index' :src="item"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 'adfaaaaaaaaaa',
				img: []
			}
		},
		methods: {
			test() {
				uni.request({
					url: 'http://127.0.0.1:3000/files/upload',
					data: {},
					method: 'POST',
					success: (data) => {
						console.log(data)
					}
				})
			},
			upload: function() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						for (let i = 0; i < tempFilePaths.length; i++) {


							const uploadTask = uni.uploadFile({
								url: 'http://127.0.0.1:3000/files/upload', //仅为示例，非真实的接口地址
								filePath: tempFilePaths[i],
								name: 'file',
								formData: {
									'user': '水能量',
									'url': 'user',
									'name': new Date().getTime() + this.id + i //文件名：时间戳+用户id+上传数组index
								},
								success: (uploadFileRes) => {
									let path = 'user/'+uploadFileRes.name;
									this.img.push('http://127.0.0.1:3000/' + path) //装载路径
									console.log(uploadFileRes.name);
								}
							});

							uploadTask.onProgressUpdate((res) => {
								console.log('上传进度' + res.progress);
								console.log('已经上传的数据长度' + res.totalBytesSent);
								console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

								// 测试条件，取消上传任务。
								// if (res.progress > 50) {
								// 	uploadTask.abort();
								// }
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.test {
		font-size: 30px;
		text-align: center;
	}
</style>
