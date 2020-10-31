<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-body">
			<view class="grace-card-view">
				<view class="grace-card-body grace-border-b">
					<image src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" class="grace-card-img"></image>
					<view class="grace-card-desc">
						<view class="grace-card-title">
							<text class="grace-card-name">张三</text>
							<text class="grace-card-name grace-text-small grace-blue">补充信息</text>
						</view>
						<text class="grace-card-text">北京市朝阳区</text> 
						<text class="grace-card-text">139*****888</text>
					</view>
				</view>
				<view class="grace-card-footer">
					<text class="grace-icons grace-card-footer-item grace-border-r">&#xe608; 店铺</text>
					<text class="grace-icons grace-card-footer-item grace-border-r">&#xe613; 设置</text>
					<text class="grace-icons grace-card-footer-item">&#xe61e; 链接</text>
				</view>
			</view>
			<view class="grace-card-view">
				<view class="grace-card-body grace-border-b">
					<image src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png" class="grace-card-img"></image>
					<view class="grace-card-desc">
						<view class="grace-card-title">
							<text class="grace-card-name">李四</text>
							<text class="grace-card-name grace-text-small grace-blue">补充信息</text>
						</view>
						<text class="grace-card-text">北京市朝阳区</text> 
						<text class="grace-card-text">139*****888</text>
					</view>
				</view>
				<view class="grace-card-footer">
					<text class="grace-icons grace-card-footer-item grace-border-r">&#xe608; 店铺</text>
					<text class="grace-icons grace-card-footer-item grace-border-r">&#xe613; 设置</text>
					<text class="grace-icons grace-card-footer-item">&#xe61e; 链接</text>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
export default {
    data() {
    	return {
    	}
    },
	methods:{},
	components:{
		gracePage
	}
}
</script>
<style>
page{background-color:#F6F7F8;}
</style>