<template>
	<view class="course">
		<!-- 商品信息组件 -->
		<iCourse :corseList="courseList" :groupObj="courseList.group" @cutCollect="cutCollect" src="http://music.163.com/song/media/outer/url?id=31877549.mp3"></iCourse>

		<!-- 商品简介标题组件 -->
		<view class="brief" >
			<view class="title">
				{{courseList.isbuy?'课程内容':'课程简介'}}
			</view>
			<scroll-view scroll-x="true" >
				<view class="html">
					<rich-text :nodes="courseList.try" :preview="true" @itemclick="clicks"></rich-text>
				</view>
			</scroll-view>
			
		</view>
		
		<view class="btns" v-if="!courseList.isbuy">
			<button class="btn"
			 @click="purchase">{{courseList.group?'立即拼团':'立即抢购'}}￥{{courseList.group?courseList.group.price:courseList.price}}</button>
		</view>
	</view>
</template>

<script>
	import courseApi from "@/api/course.js"
	import iCourse from "./components/i-course.vue"
	import iTitle from "@/components/i-title.vue"
	export default {
		components:{
			iCourse,
			iTitle,
		},
		data() {
			return {
				page:{
					id:0,
					column_id:0,
					group_id:0,
					flashsale_id:0,
				},
				courseList:{},//页面数据
			};
		},
		onLoad(options) {
			this.getId(options)
			this.handelCourseData()
			
		},
		methods:{
			//收藏api
			async handelCollect(){
				try{
					const res = await courseApi.getCollect({goods_id:this.page.id,type:"course"})
					if(res.statusCode===200){
						this.$utils.msg('收藏成功')
						this.courseList.isfava = true
					}
					console.log(res);
				}catch(e){
					//TODO handle the exception
				}
			},
			//取消收藏api
			async handelCancelCollect(){
				try{
					const res = await courseApi.getCancelCollect({goods_id:this.page.id,type:"course"})
					if(res.statusCode===200){
						this.$utils.msg('取消收藏成功')
						this.courseList.isfava = false
					}
					console.log(res);
				}catch(e){
					//TODO handle the exception
				}
			},
			// 收藏切换
			cutCollect(){
				if(!this.courseList.isfava){
					this.handelCollect()
				}else{
					this.handelCancelCollect()
				}
			},
			//获取id
			getId(options){
				if(options.id){
				    this.page.id = options.id
				}
				if(options.group_id){
					this.page.group_id = options.group_id
				}
				if(options.flashsale_id){
					this.page.flashsale_id = options.flashsale_id
				}
			},
			//获取页面数据
			async handelCourseData(){
				try{
					const res = await courseApi.getCourseList(this.page)
					console.log(res);
					if(res.statusCode===404){
						this.$utils.msg(res.data.data)
						setTimeout(()=>{
							this.navBack()
						},1000)
						return
					}
					res.data.data.try = res.data.data.try.replace(/<img/gi, '<img style="max-width:100%;height:auto"')
					this.courseList=res.data.data
					this.tabTitle(res.data.data.title)
				}catch(e){
					console.log(e);
				}
			},
			//获取导航栏内容
			tabTitle(titles){
				let title = document.querySelector('.uni-page-head__title')
				title.innerHTML = titles
			},
			clicks(e){
				console.log(e.detail.node.attrs.src);
				// this.navTo('/pages/web-view/web-view?url='+e.detail.node.attrs.src)
			},
			//拼团/抢购
			purchase(){
				if(this.courseList.group){
				}else{
					console.log(this.courseList);
					this.navTo(`/pages/create-order/create-order?id=${this.courseList.id}&type=course`)
				}
			}
		}
	}
</script>

<style lang="scss">
page,.course{
	width: 100%;
	height: 100%;
	background-color: #f2f2f1;
	.brief{
		width: 100%;
		background-color: #fff;
		margin-top: 20rpx;
		.title{
			line-height: 80rpx;
			border-bottom: 1rpx solid #eee;
			padding: 0 20rpx;
			color: #333333;
		}
		.html{
			padding: 0 20rpx;
		}
		padding-bottom: 150rpx;
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
