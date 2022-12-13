<template>
	<view class="testList">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
		  	<iExamItem :item="item" v-for="(item,index) in examList" :key="index"></iExamItem>
		</mescroll-body>
	
	</view>
</template>

<script>
	import iExamItem from "./components/exam.vue"
	import examApi from "@/api/exam.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components:{
			iExamItem
		},
		data() {
			return {
				downOption: {
					native: true // 必须配置此项，且需在pages.json配置"enablePullDownRefresh" : true
						
				},
				upOption: {
					noMoreSize: 0,
					textNoMore:"没有更多数据了",
					empty: "none",
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 5//每页数据条数,默认10
					},
				},
				count:null,
				examList:[],
			};
		},
		methods:{
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.examList = []
				}
				const {data} = await examApi.getExamItem({page:page.num,limit:page.size})
				this.count = data.data.count
				this.examList =this.examList.concat(data.data.rows) 
				
				this.mescroll.endBySize(this.examList.length, this.count); 
				
			},
		}
		
	}
</script>

<style lang="scss">
page,.testList{
	height: 100%;
	background-color: #f5f5f3;
}
</style>
