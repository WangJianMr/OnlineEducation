<template>
	<view>
		<notLogin v-if="!getTokens"></notLogin>
		<view class="" v-else>
			<!-- //nav -->
			<navBar :navList="navList"></navBar>
			<!-- //tab -->
			<tabbar class="tabbar" :tabbarList="tabbarList" :tabIndex="tabIndex" @tabSwitchover="tabSwitchover"></tabbar>

				<swiper :current="tabIndex" @change="currentChange">
					<swiper-item>
						1
					</swiper-item>
					<swiper-item>
						2
					</swiper-item>
				</swiper>

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
	export default {
		components: {
			notLogin,
			navBar,
			tabbar
		},
		data() {
			return {
				tabIndex:0,
				tabbarList:['课程','专栏'],
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
		methods:{
			tabSwitchover(val){
				this.tabIndex = val
			},
			currentChange(e){
				console.log(e);
				this.tabIndex = e.detail.current
			}
		}

	}
</script>

<style lang="scss">
.tabbar{
	margin-top: 50rpx;
}
</style>
