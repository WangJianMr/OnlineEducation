<template>
	<view class="order">
		<view class="top">
			<image :src="orderList.cover" mode=""></image>
			<view class="box">
				{{obj[orderList.type]}}
			</view>
		</view>
		<view class="footer">
			<view class="title text-ellipsis" :style="`width: ${width}`">
				{{orderList.title}}
			</view>
			<view class="pic">
				<text class="currentPrice">￥{{orderList.price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"orders",
		props:{
			orderList:{
				type:Object,
				default:()=>{}
			},
			width:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				obj:{
					"video":'视频',
					"media":"图文",
					"audio":"音频",
					"column":"专栏"
				}
			};
		},
	}
</script>

<style lang="scss">
	.order{
		display: flex;
		padding:20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.top{
		min-width: 300rpx;
		width: 300rpx;
		height: 170rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.box{
			position: absolute;
			color: #fff;
			bottom: 10rpx;
			right: 10rpx;
			background-color: rgba(0, 0, 0, .3);
			font-size: 22rpx;
			padding: 5rpx 10rpx;
		}
	}
	.footer{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20rpx;
		.title{
			width: 100%;
			font-size: 32rpx;
			margin-top: 5rpx;
		}
		.pic{
			.currentPrice{
				color: #dc3545;
				font-size: 36rpx;
			}
			.originalPrice{
				color: #ccc;
				font-size: 22rpx;
			}
		}
	}
</style>