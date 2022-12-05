<template>
	<view class="msgHome">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
		   <userMsg :msgList="msgList"></userMsg>
		</mescroll-body>
	</view>
</template>

<script>
	import userApi from "@/api/user.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import userMsg from "./components/user-msg-list.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			userMsg
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
		
				count: 0,
				msgList: [],
			};
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.msgList = []
				}
				const {data} = await userApi.getUserMessage({page:page.num,limit:page.size})
				this.count = data.data.count
				this.msgList =this.msgList.concat(data.data.rows) 
				console.log(this.msgList);
				
				this.mescroll.endBySize(this.msgList.length, this.count); 
				
			},
		}
	}
</script>

<style lang="scss">
page,.msgHome{
	width: 100%;
	height: 100%;
	background-color: #eee;
}
</style>
