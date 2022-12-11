<template>
	<view class="catalogue">
		<view class="topNum">
			<view class="num">
				共 {{catalogue.length}} 节
			</view>
		</view>
		<view class="conent">
			<view class="item" v-for="(item,index) in catalogue" :key="index">
				<view class="item_left">
					{{index+1<10?'00'+(index+1):index+1<100?'0'+(index+1):(index+1)}}
				</view>
				<view class="item_right">
					<view class="title">
						{{item.title}}
					</view>
						<text class="type">{{obj[item.type]}}</text>
						<text class="type" v-if="item.price==='0.00'">{{item.price==='0.00'?'免费试看':''}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'catalogue',
		props:{
			catalogue:{
				type:Array,
				default:()=>[]
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
	.catalogue{
		height: 100%;
		.topNum{
			padding: 20rpx;
			.num{
				font-size: 34rpx;
				color: #888;
				line-height: 80rpx;
				padding-left: 20rpx;
				border: 1rpx solid #dee2e6;
				border-radius: 5rpx;
				background-color: #f8f9fa;
			}
		}
		.conent{
			width: 100%;
			background-color: #fff;
			.item{
				display: flex;
				align-items: center;
				padding:30rpx;
				border-bottom: 1rpx solid #dee2e6;
				.item_left{
					font-size: 36rpx;
					color: #888;
					margin-right: 40rpx;
				}
				.item_right{
					.title{
						font-size: 36rpx;
						color: #888;
					}
					.type{
						display: inline-block;
						padding: 0 12rpx;
						font-size: 24rpx;
						// max-width: 120rpx;
						color: #dc3646;
						border: 1rpx solid #dc3646;
						border-radius: 10rpx;
						margin-right: 10rpx;
					}
					
				}
			}
		}
	}
</style>