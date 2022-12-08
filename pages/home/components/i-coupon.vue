<template>
	<view class="coupon">
		<scroll-view scroll-x="true" class="scroll">
			<chiCoupon  :couponList="couponList" :dfFlag="true" @getCoupon="getCoupon"></chiCoupon>
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
		methods:{
			getCoupon(item){
				this.$emit('getCoupon',item)
			},
		}
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