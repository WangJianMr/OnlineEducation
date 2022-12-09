<template>
	<view class="couponHome">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<myCouponList :couponList='couponList' :goods_id="goods_id"></myCouponList>
			
			<view class="ss" v-if="couponList.length<=0">
				没有更多数据了
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import myCouponList from "./components/user-coupon-list.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			myCouponList
		},
		data() {
			return {
				downOption: {
					native: true // 必须配置此项，且需在pages.json配置"enablePullDownRefresh" : true
		
				},
				upOption: {
					noMoreSize:0 ,
					textNoMore:"没有更多数据了",
					empty: "none",
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 5//每页数据条数,默认10
					},
				},
		
				count: 0,
				couponList: [],
				goods_id:null,
			};
		},
		onLoad(options) {
			console.log(options);
			if(options.goods_id && options.type){
				this.goods_id = options.goods_id
			}
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.couponList = []
				}
				const {data} = await userApi.getUserCoupon({page:page.num,limit:page.size})
				console.log(data);
				this.count = data.data.count
				this.couponList =this.couponList.concat(data.data.rows) 
				console.log(this.couponList);
				
				this.mescroll.endBySize(this.couponList.length, this.count); 
				
			},
		}
	}
</script>

<style lang="scss">
page,.couponHome{
	width: 100%;
	height: 100%;
	background-color: #fff;
	.ss{
		text-align: center;
		width: 100%;
		margin-top: 35rpx;
		color: #aaa;
	}
}
</style>
