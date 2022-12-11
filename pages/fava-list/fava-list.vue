<template>
	<view class="favaHome">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<view class="ss" v-if="favaList.length<=0">
				没有更多数据了
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components:{
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
				favaList: [],
			};
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.favaList = []
				}
				const {data} = await userApi.getUserCollect({page:page.num,limit:page.size})
				this.count = data.data.count
				this.favaList =this.favaList.concat(data.data.rows) 
				
				this.mescroll.endBySize(this.favaList.length, this.count); 
				
			},
		}
	}
</script>

<style lang="scss">
page,.favaHome{
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
