<template>
	<view class="info">
		<view class="left">
			<image src="../../../static/demo/banner/banner1.png" mode=""></image>
		</view>
		<view class="right">
			<text class="top">立即登录</text>
			<text class="bottom">登录解锁更多功能</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Info"
	}
</script>

<style lang="scss">
	.info{
		display: flex;
		margin-left: 5rpx;
		margin-top: 15rpx;
		.left{
			width: 125rpx;
			height: 125rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			line-height: 65rpx;
			color: #fff;
			margin-left: 25rpx;
			.top{
				font-size: 32rpx;
			}
			.bottom{
				font-size: 26rpx;
			}
		}
	}
</style>