<template>
	<view class="myCoupon">
		<view class="rows">
			<view class="left">
				<view class="top">
					￥6.66
				</view>
				<view class="bom">
					使用专栏:我是新专栏
				</view>
			</view>
			<view class="right">
				立即前往
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"myCoupon",
		props:{
			couponList:{
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
.myCoupon{
	padding: 25rpx 20rpx;
	.rows{
		display: flex;
		justify-content: space-between;
		background-color: #fec107;
		border-radius: 10rpx;
		.left{
			flex:4;
			color: #fff;
			padding: 30rpx 20rpx;
			background-color: rgba(0, 0, 0, .2);
			border-right: 2rpx dotted #fff;
			border-radius: 10rpx 0 0 10rpx;
			.top{
				font-size: 45rpx;
			}
			.bom{
				font-size: 32rpx;
			}
		}
		.right{
			flex:2;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
	}
}
</style>