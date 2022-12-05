<template>
	<view class="orders">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<myOrderList></myOrderList>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import userApi from "@/api/user.js"
	import myOrderList from "./components/user-order-list.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			myOrderList,
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
				orderList: [],
			};
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.orderList = []
				}
				const {data} = await userApi.getUserOrder({page:page.num,limit:page.size})
				this.count = data.data.count
				this.orderList =this.orderList.concat(data.data.rows) 
				
				this.mescroll.endBySize(this.orderList.length, this.count); 
				
			},
		}
	}
</script>

<style lang="scss">
	page,.orders{
		width: 100%;
		height: 100%;
		background-color: #f5f5f3;
	}
</style>
