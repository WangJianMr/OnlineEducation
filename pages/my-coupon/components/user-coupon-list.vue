<template>
	<view class="myCoupon" :class="{boxActive:dfFlag}">
		<view class="rows" ref="coupon" :class="{rowsActive:item.isgetcoupon,falseActive:!dfFlag}" v-for="(item,index) in couponList" :key="index" @click="getCoupon(item)">
			<view class="left" :class="{leftActive:item.isgetcoupon}">
				<view class="top">
					￥{{item.price}}
				</view>
				<view class="bom">
					{{item.type=='course'?'适用课程':'适用专栏'}}:{{item.title || item.value.title}}
				</view>
			</view>
			<view class="right" v-if="dfFlag">
				{{item.isgetcoupon?'已领取':'未领取'}}
			</view>
			<view class="right" v-if="!dfFlag">
					{{item.used?'已使用':'立即使用'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myCoupon",
		props: {
			couponList: {
				type: Array,
				default: () => []
			},
			dfFlag:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			}
		},
		methods:{
			getCoupon(item){
				if(item.isgetcoupon || !item.isgetcoupon){
					this.$emit('getCoupon',item)
				}else if(item.used || !item.used){
					console.log(456);
				}
			},
		}
	}
</script>

<style lang="scss">
	.boxActive{
		display: flex !important;
		text-align: center !important;
		align-items: center !important;
		height: 130rpx;
		padding: 0rpx !important;

	}
	.rowsActive {
		background-color: #dae0e5 !important;

		.leftActive {
			background-color: rgba(0, 0, 0, 0) !important;
			
		}
	}
	.falseActive{
		margin-top: 20rpx;
	}

	.myCoupon {
		width: 100%;
		padding: 0 20rpx;
		.rows {
			width: 100%;
			display: flex;
			justify-content: space-between;
			background-color: #fec107;
			margin-right: 30rpx;
			.left {
				flex: 5;
				color: #fff;
				padding: 20rpx;
				background-color: rgba(0, 0, 0, .2);
				border-right: 3rpx dotted #fff;

				.top {
					font-size: 36rpx;
				}

				.bom {
					font-size: 22rpx;
				}
			}

			.right {
				flex: 2;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}
		}
	}
</style>
