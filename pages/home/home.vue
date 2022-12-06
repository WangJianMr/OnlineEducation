<template>
	<view class="home">
		<view class="top">
			<!-- 搜索框 -->
			<iSerch :serchList="serchList"></iSerch>
			<!-- 模态框 -->
			<iSwiper :swiperList="swiperList.data"></iSwiper>
			<!-- nav选项 -->
			<iNav :homeNavList="homeNavList.data"></iNav>
			<!-- 优惠劵 -->
			<iCoupon :couponList="couponList"></iCoupon>
		</view>
		<view class="center">
			<!-- 拼团 -->
			<iGroup :groupList="groupList" :count="count"></iGroup>
			
		</view>
		<view class="footer">
			<!-- 最新列表 -->
			<iNewList :newList="newList"></iNewList>
		</view>
		
		<view class="image">
			<image :src="image" mode=""></image>
		</view>
	</view>
</template>

<script>
	import iSerch from "./components/i-serch.vue"
	import iSwiper from "./components/i-swiper.vue"
	import iNav from "./components/i-nav.vue"
	import iCoupon from "./components/i-coupon.vue"
	import iGroup from "./components/i-group.vue"
	import iNewList from "./components/i-newList.vue"
 	
	import homeApi from "@/api/home.js"
	export default {
		components: {
			iSerch,
			iSwiper,
			iNav,
			iCoupon,
			iGroup,
			iNewList
			
		},
		data() {
			return {
				serchList:{},//搜索框数据
				swiperList:{},//轮播图数据
				homeNavList:{},//nav数据
				couponMessage:{},//优惠劵信息
				couponList:[],//优惠劵数据
				groupMessage:{},//拼团信息
				usable:1,//拼团接口所需数据
				groupList:[],//拼团数据
				count:null,//拼团数量
				newListMessage:{},//最新列表信息
				newList:[],//最新列表数据
				image:'',//尾部展示图片
				
			};
		},
		onLoad() {
			this.handelHomeList()
		},
		onPullDownRefresh(e){
			this.handelHomeList()
		},
		methods: {
			//获取首页数据
			async handelHomeList(){
				try{
					const {data} = await homeApi.getHomeList()
					this.serchList = data.data[0]
					this.swiperList = data.data[1]
					this.homeNavList = data.data[2]
					this.couponMessage = data.data[3]
					this.groupMessage = data.data[4]
					this.newListMessage = data.data[5]
					this.newList = data.data[5].data
					this.image = data.data[6].data
					this.handelCouponList()
					this.handelGroupList()
					uni.stopPullDownRefresh()
				}catch(e){
					//TODO handle the exception
				}
			},
			//获取优惠劵数据
			async handelCouponList(){
				try{
					const {data} = await homeApi.getCouponList()
					this.couponList=data.data
				}catch(e){
					//TODO handle the exception
				}
			},
			//获取拼团数据
			async handelGroupList(){
				try{
					const {data} = await homeApi.getGroupList({usable:this.usable})
					this.groupList = data.data.rows
					this.count = data.data.count
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="scss">
	page,.home {
		background-color: #f5f5f3;
		.top{
			width: 100%;
			background-color: #fff;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
		}
		.footer,.center{
			width: 100%;
			background-color: #fff;
			padding: 0 20rpx;
			margin-bottom: 15rpx;
		}
		.image{
			width: 100%;
			height: 350rpx;
			padding-bottom: 10rpx;
			background-color: #fff;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
