<template>
	<view class="create_order">
		<iOrder :orderList="orderList" width="380rpx"></iOrder>
		<view class="tab">
			<optionTab :optionList="list" :settingFlag="true" :num="num" :id="orderList.id"></optionTab>
			<view class="btns">
				<button class="btn">立即购买￥{{orderList.price}}</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import iOrder from "./components/i-orderList.vue"
	import courseApi from "@/api/course.js"
	import optionTab from "@/pages/my/components/optionTab.vue"
	export default {
		components: {
			iOrder,
			optionTab
		},
		data() {
			return {
				orderList: {},
				list: [
					[{
						title: '优惠劵',
						rightIcon:"iconfont icon-right",
						page: '/pages/my-coupon/my-coupon',
						login: false, 
						rightRate:true
					},
					{
						title: '支付方式',
						rightPay:'微信支付'
					},
					{
						
					}
					 
					]
				],
				num:1,
			};
		},
		onLoad(options) {
			this.handelOrder(options)
			this.handelUseSpecialRatesr(options)
		},
		methods: {
			//获取数据
			async handelOrder(options) {
				try {
					const res = await courseApi.getOrder({
						id: options.id,
						type: options.type
					})
					this.orderList = res.data.data
					console.log(res);
				} catch (e) {
					//TODO handle the exception
				}
			},
		    //获取优惠劵张数
			async handelUseSpecialRatesr(options){
				try{
					const res = await courseApi.getUseSpecialRatesr({goods_id:options.id,type:options.type})
					this.num = res.data.data
					console.log(res);
				}catch(e){
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="scss">
	page,
	.create_order {
		width: 100%;
		height: 100%;
		background-color: #f5f5f3;
		.tab{
			background-color: #fff;
			height: 100%;
		}
		.btns{
			padding: 20rpx;
			background-color: #fff;
			border-top: 1rpx solid #eee;
			position: fixed;
			bottom: 0;
			width: 100%;
			.btn{
				background-color: #5ccc84;
				color: #fff;
			}
		}
	}
</style>
