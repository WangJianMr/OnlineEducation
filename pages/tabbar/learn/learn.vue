<template>
	<view class="learn">
		<notLogin v-if="!getTokens"></notLogin>
		<view class="cc" v-else>
			<view class="top">
				<!-- //nav -->
				<navBar :navList="navList"></navBar>
				<!-- //tab -->
				<tabbar class="tabbar" :tabbarList="tabbarList" :tabIndex="page.type" @tabSwitchover="tabSwitchover">
				</tabbar>
			</view>
			
			<view class="bot">
				<swiper class="swiper" :current="page.type" @change="currentChange">
					<swiper-item v-for="(tab,i) in tabbarList" :key="i">
						<MescrollItem ref="mescrollItem" :i="i" :index="page.type" :height="height" :page="page">
						</MescrollItem>
					</swiper-item>
				</swiper>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	import notLogin from "./components/notLogin"
	import navBar from "@/pages/my/components/navBar.vue"
	import tabbar from "./components/tabbar.vue"
	import MescrollItem from "./components/mescroll-swiper-item.vue"
	export default {
		components: {
			notLogin,
			navBar,
			tabbar,
			MescrollItem
		},
		data() {
			return {
				page: {
					page: 1,
					type: 0,
				},
				height: "100%",
				tabbarList: ['课程', '专栏'],
				navList: [{
						icon: 'iconfont icon-OrderHistory',
						title: '帖子',
						page: '/pages/my-post/my-post',
						login: false,
					},
					{
						icon: 'iconfont icon-pinglun2',
						title: '考试',
						page: '/pages/my-test/my-test',
						login: false,
					},
					{
						icon: 'iconfont icon-shoucang1',
						title: '电子书',
						page: '/pages/my-book/my-book',
						login: false,
					},
				]

			};
		},
		computed: {
			...mapGetters(['getTokens'])
		},
		methods: {
			tabSwitchover(val) {
				this.page.type = val
			},
			currentChange(e) {
				console.log(e);
				this.page.type = e.detail.current
			}
		}

	}
</script>

<style lang="scss">
	page,
	.learn {
		height: 100%;
		overflow: hidden;
	}

	.cc {
		height: 100%;
		display: flex;
		flex-direction: column;
		.top{
			flex: 2;
		}
		.bot{
			flex: 6;
			.swiper{
				height: 100%;
			}
		}
	}

	.tabbar {
		margin-top: 50rpx;
	}
	
</style>

