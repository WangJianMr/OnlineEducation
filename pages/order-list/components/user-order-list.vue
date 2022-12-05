<template>
	<view class="order">
		<view class="item">
			<view class="item-top">
				<view class="conent-top">
					<view class="tirm">
						订单时间:2021-01-04 09:49
					</view>
					<view class="num">
						订单号:123456
					</view>
				</view>
				<view class="conent-center">
					uniCloud单商户商城app
				</view>
				<view class="pic">
					￥198
				</view>
			</view>
			<view class="item-footer">
				交易已完成
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"userMsg",
		props:{
			orderList:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return{
				
			}
		},
	}
</script>

<style lang="scss">
	.order{
		.item{
			margin-bottom: 20rpx;
			background-color: #fff;
			padding-top: 30rpx;
			.item-top{
				padding: 0 20rpx;
				overflow: hidden;
				.conent-top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 26rpx;
					color: #666c71;
				}
				.conent-center{
					font-size: 36rpx;
					margin-top: 40rpx;
				}
				.pic{
					float: right;
					font-size: 40rpx;
					font-weight: 700;
					color: #d7293a;
				}
			}
			.item-footer{
				padding: 0 20rpx;
				margin-top: 35rpx;
				line-height: 90rpx;
				border-top:1rpx solid #f1f1f1;
			}
		}
	}
</style>