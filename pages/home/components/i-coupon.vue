<template>
	<view class="coupon">
		<scroll-view scroll-x="true" class="scroll">
			<chiCoupon class="a" :couponList="couponList" :dfFlag="true"></chiCoupon>
		</scroll-view>
	</view>
</template>

<script>
	import chiCoupon from"@/pages/my-coupon/components/user-coupon-list.vue"
	export default{
		name:"coupon",
		components:{
			chiCoupon
		},
		props:{
			couponList:{
				type:Array,
				default:()=>[]
			}
		},
	}
</script>

<style lang="scss">
	.coupon{
		margin-top: 40rpx;
		padding:0 20rpx;
		.scroll{
			white-space: nowrap;
		}
	}
	
	
</style>