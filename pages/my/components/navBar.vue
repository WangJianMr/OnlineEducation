<template>
	<view class="navBar">
		<view class="navItem" v-for="(item,index) in navList" :key="index" @click="navAuthTo(item)">
			<text :class="item.icon" class="icon"></text>
			<text class="title mt-1">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	import myNavList from "@/config/my-nav-list.js"
	export default {
		name: "navBar",
		props: {
			navList: {
				type: Array,
				default: () => myNavList()
			}
		},

		methods:{
			navAuthTo(item){
				if(item.login || this.$store.getters.getTokens){
					this.navTo(item.page)
					if(item.bar){
						uni.switchTab({
							url: item.page
						});
					}
					
				}else{
					this.navTo('/pages/my/register')
				}
			}
		}

	}
</script>

<style lang="scss">
	.navBar {
		width: 695rpx;
		height: 150rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 50rpx auto 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow:  0 1px 6px #ddd;

		.navItem {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;

			.icon {
				color: rgb(254, 189, 0);
				font-size: 40rpx !important;
			}

			.title {
				font-size: 12rpx;
				color: #6c757d;
			}
		}
	}
</style>
