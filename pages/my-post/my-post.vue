<template>
	<view class="myPost">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<iPostItem :testList="testList" @give="give" @delBbs="delBbs"></iPostItem>
		</mescroll-body>
	</view>
</template>

<script>
	import learnApi from "@/api/learn.js"
	import bbsApi from "@/api/bbs.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import iPostItem from "./components/postItem.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			iPostItem
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
			// 
			//点击删除
			delBbs(item){
				console.log(item);
				let i = this.testList.findIndex(ele=>ele.id === item.id)
				uni.showModal({
					content:'确定删除帖子吗',
					success: (res) => {
						if(res.confirm){
							this.handellDelBbs(item.id,i)
						}
					}
				})
			},
			//删除帖子api
			async handellDelBbs(id,i){
				try{
					const res = await learnApi.getDelBbs({id})
					if(res.statusCode===200){
						this.testList.splice(i,1)
						this.$utils.msg('删除成功')
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//点赞
			give(item) {
				console.log(item);
				let i = this.testList.findIndex(ele=>ele.id === item.id)
				if (item.issupport) {
					this.handelCancelGive(item.id,i)
				} else {
					this.handelGive(item.id,i)
				}
			},
			//取消点赞api
			async handelCancelGive(id,i) {
				try {
					const res = await bbsApi.getBbsCancelGive({
						post_id: id
					})
					if (res.statusCode === 200) {
						this.$utils.msg('取消成功')
						this.testList[i].issupport = false
						this.testList[i].support_count -= 1
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//点赞api
			async handelGive(id,i) {
				try {
					const res = await bbsApi.getBbsGive({
						post_id: id
					})
					if (res.statusCode === 200) {
						this.$utils.msg('点赞成功')
						this.testList[i].issupport = true
						this.testList[i].support_count += 1
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.testList = []
				}
				const {data} = await learnApi.getUserBbs({page:page.num,limit:page.size})
				this.count = data.data.count
				this.testList =this.testList.concat(data.data.rows) 
				console.log(this.testList);
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

</style>
