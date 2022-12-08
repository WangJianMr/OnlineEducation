<template>
	<view class="result">
		<view class="tab">
			<iTabBar :tabbarList="tabbarList" :tabIndex="page.type" @tabSwitchover="tabSwitchover"></iTabBar>
		</view>

			<!-- <swiper class="swiper" :current="page.type" @change="currentChange">
				<swiper-item class="swipera">
					<iCourse :page="page" :istt='0'></iCourse>
				</swiper-item>
				<swiper-item>
					<iColumm :page="page" :istt='1'></iColumm>
				</swiper-item>
			</swiper> -->
			
			<swiper :style="{height: height}" :current="page.type" @change="currentChange">
				<swiper-item v-for="(tab,i) in tabbarList" :key="i">
					<mescroll-item  ref="mescrollItem" :i="i" :index="page.type" :height="height" :page="page"></mescroll-item>
				</swiper-item>
			</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./components/mescroll-swiper-item.vue"
	import iTabBar from "@/pages/tabbar/learn/components/tabbar.vue"
	import iCourse from "./components/i-course.vue"
	import iColumm from "./components/i-columm"
	export default {
		components: {
			iTabBar,
			iCourse,
			iColumm,
			MescrollItem
		},
		data() {
			return {
				tabbarList: ['课程', '专栏'],
				page: {
					keyword: "",
					page: 1,
					type: 0,
				},
				searchList: [],
				height:"",
			};
		},
		onLoad(options) {
			this.page.keyword = options.keyword
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80) + 'px'
		},
		
		methods: {

			//设置选中的tab
			tabSwitchover(val) {
				this.page.type = val
			},
			async currentChange(e) {
				this.page.type = e.detail.current
			},

			//搜索api
			// async handelSearchList(){
			// 	try{

			// 		const res = await searchApi.getSearchList(obj)
			// 		this.searchList = res.data.data.rows

			// 	}catch(e){
			// 		//TODO handle the exception
			// 	}
			// },


		},

	}
</script>

<style lang="scss">
	page,.result {
		height: 100%;
		overflow: hidden;
		.tab {
			margin-top: 18rpx;
		}

		.swiper {
			width: 100%;
			height: 100%;

			.swipera {
				height: 100%;
			}

			background-color: #fff;
		}
	}
</style>
