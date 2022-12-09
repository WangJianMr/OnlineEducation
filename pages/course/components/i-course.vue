<template>
	<view class="icourse">
			<view class="top">
				<image :src="corseList.cover" mode=""></image>
				<view class="box">
					{{obj[corseList.type]}}
				</view>
			</view>
			<view class="footer">
				<view class="title text-ellipsis">
				   {{corseList.title}}
				</view>
				<view class="num">
					<text>{{corseList.sub_count}} 人学过</text>
					<text class="iconfont icon-shoucang1 icon" :class="{actives:corseList.isfava}"></text>
				</view>
				<view class="pic">
					<text class="currentPrice" v-if="corseList.price==='0.00'">免费</text>
					<text class="currentPrice" v-else>￥2</text>
					<text class="originalPrice"><s>￥3</s></text>
				</view>
			</view>
	</view>
</template>

<script>
	export default{
		name:"iCourse",
		props:{
			corseList:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				obj:{
					"video":'视频',
					"media":"图文",
					"audio":"音频",
					"column":"专栏"
				},
				isfava:false,
			};
		},
	}
</script>

<style lang="scss">
	.icourse{
		width: 100%;
		background-color: #fff;
	}
	.top{
		width: 100%;
		height: 410rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.box{
			position: absolute;
			color: #fff;
			bottom: 20rpx;
			right: 20rpx;
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
		padding: 40rpx 25rpx;
		.title{
			width: 100%;
			font-size: 40rpx;
			margin-top: 5rpx;
		}
		.num{
			font-size: 24rpx;
			padding: 20rpx 0;
			color: #888;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.icon{
				font-size: 48rpx
			}
			.actives{
				color: #6bd18f;
			}
		}
		.pic{
			position: relative;
			.currentPrice{
				color: #dc3545;
				font-size: 36rpx;
			}
			.originalPrice{
				color: #ccc;
				font-size: 22rpx;
				margin-left: 8rpx;
				position: absolute;
				bottom: 1rpx;
			}
		}
	}
</style>