<template>
	<view class="bbs">
		<iBbsTop :bbsTopList="bbsTopList" :bbsIndex="bbsIndex" :topCount="topCount" @scrolltolower="scrolltolower" @alterBbsIndex="alterBbsIndex"></iBbsTop>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<iuserNum :postCount="postCount" :userCount="userCount"></iuserNum>
			<iContent :bbsList="bbsList" @give="give"></iContent>
		</mescroll-body>
		
		
	</view>
</template>

<script>
	import bbsApi from "@/api/bbs.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import iBbsTop from "./components/bbsTop.vue"
	import iContent from "./components/bbsContent.vue"
	import iuserNum from "./components/bbsUserNum.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			iBbsTop,
			iContent,
			iuserNum
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
				bbs_id:0,
				keyword:"",
				count:null,
				bbsList:[],
				postCount:0,//总帖子
				userCount:0,//总用户
				bbsTopList:[],
				bbsIndex:0,
				topCount:null,
				topPage:1,
			};
		},
		onNavigationBarButtonTap(e){
			if(e.index===0){
				this.navTo('/pages/add-post/add-post')
			}
		},
		onShow() {
			this.handelBbsTopList()
			// this.mescroll.resetUpScroll()
		},
		methods: {
			//点赞
			give(item){
				let index = this.bbsList.findIndex(ele=>ele.id===item.id)
				console.log(item);
				if(item.issupport){
					this.handelCancelGive(item.id,index)
				}else{
					this.handelGive(item.id,index)
				}
				
			},
			//取消点赞api
			async handelCancelGive(id,index){
				try{
					const res = await bbsApi.getBbsCancelGive({post_id:id})
					if(res.statusCode===200){
						this.$utils.msg('点赞成功')
						this.bbsList[index].issupport=false
						this.bbsList[index].support_count-=1
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//点赞api
			async handelGive(id,index){
				try{
					const res = await bbsApi.getBbsGive({post_id:id})
					if(res.statusCode===200){
						this.$utils.msg('点赞成功')
						this.bbsList[index].issupport=true
						this.bbsList[index].support_count+=1
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//改变top下标
			alterBbsIndex(index,item){
				this.bbsIndex = index
				this.bbs_id = item.id
				this.mescroll.resetUpScroll()
				
			},
			//右滑触发
			scrolltolower(){
				this.topPage+=1
				this.handelBbsTopList()
			},
			//获取顶部数据
			async handelBbsTopList(){
				try{
					const res = await bbsApi.getBbsTopList({page:this.topPage})
					this.postCount = res.data.data.postCount
					this.userCount = res.data.data.userCount
					this.bbsTopList =this.bbsTopList.concat(res.data.data.rows) 
					this.topCount = res.data.data.count
					if(this.bbsTopList[0].id!=0){
						this.bbsTopList.unshift({id:0,title:'全部'})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if(page.num===1){
					this.bbsList = []
				}
				const {data} = await bbsApi.getBbsConentList({page:page.num,keyword:this.keyword,bbs_id:this.bbs_id})
				this.count = data.data.count
				this.bbsList = this.bbsList.concat(data.data.rows)
				this.mescroll.endBySize(this.bbsList.length, this.count); 
			},
		}
		
	}
</script>

<style lang="scss">
page,.bbs{
	width: 100%;
	height: 100%;
	background-color: #f5f5f3;
}
</style>
