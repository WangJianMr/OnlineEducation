<template>
	<view class="not">
		<view class="conent">
			<view class="image">
				<image src="@/static/noLogin.png" mode=""></image>
			</view>
			<text class="text">登录后才可以查看我的学习哦</text>
			<button @click="navTo('/pages/my/register')">立即登录</button>
		</view>
	</view>
</template>

<script>
	export default{
		name:"not",
		props:{
			
		}
	}
</script>

<style lang="scss">
	.not{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.conent{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.image{
				width: 350rpx;
				height: 350rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				color: #6c757d;
			}
			button{
				height: 60rpx !important;
				line-height: 60rpx !important;
				font-size:  28rpx;
				border: 2rpx solid #000;
				background-color: #fff;
				margin-top: 20rpx;
			}
		}
		
	}
</style>