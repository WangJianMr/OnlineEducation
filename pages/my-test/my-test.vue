<template>
	<view class="myText">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<bbsItem v-for="(item,index) in testList" :key="index" :item="item"></bbsItem>
			<view class="fot" v-if="testList.length===count">
				没有更多数据了
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import learnApi from "@/api/learn.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import bbsItem from "./components/bbsItem.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			bbsItem
		},
		data() {
			return {
				downOption: {
					native: true // 必须配置此项，且需在pages.json配置"enablePullDownRefresh" : true
		
				},
				upOption: {
					noMoreSize: 0,
					textNoMore:"",
					empty: "none",
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 5//每页数据条数,默认10
					},
				},
				count: 0,
				testList:[]
			};
		},
		methods:{
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.testList = []
				}
				const {data} = await learnApi.getBbs({page:page.num,limit:page.size})
				this.count = data.data.count
				this.testList =this.testList.concat(data.data.rows) 
				this.mescroll.endBySize(this.testList.length, this.count); 
				
			},
		}
	}
</script>

<style lang="scss">
page,.myText{
	height: 100%;
	background-color: #f3f3f1;
}
.fot{
	text-align: center;
	background-color: #fff;
	line-height: 100rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
