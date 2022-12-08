<template>
	<view class="swiper">
		<swiper class="swiperItem" indicator-dots autoplay :interval="3000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.src" mode="" @click="imageAuth(item)"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		name:"iSwiper",
		props:{
			swiperList:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			imageAuth(item){
				if(item.url){
					this.navTo("/pages/webview/webview?url="+item.url)
				}else{
					this.navTo("/pages/course/course?id="+item.course_id)
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper{
		width: 100%;
		height: 300rpx;
		padding: 5rpx 0;
		.swiperItem{
			width: 100%;
			height: 100%;
			swiper-item{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
				text-align: center;
				image{
					border-radius: 10rpx;
					width: 95%;
					height: 100%;
				}
			}
		}
	}
</style>