<template>
	<view class="search">
		<iPastRecords :list="searchHistoryList" @empty="empty" v-if="searchHistoryList.length"></iPastRecords>
	</view>
</template>

<script>
	import iPastRecords from "./components/pastRecords.vue"
	export default {
		components: {
			iPastRecords
		},
		data() {
			return {
				searchHistoryList: uni.getStorageSync('searchList') || [], //历史搜索
			};
		},
		onLoad() {
			// this.searchHistoryList = uni.getStorageSync('searchList') || []
		},
		onNavigationBarButtonTap(e){
			if(e.index===0){
				let placeholder = document.querySelector('.uni-input-input[type=search]')
				this.authResult(placeholder.value)
			}
		},
		onNavigationBarSearchInputConfirmed(e) {
			this.authResult(e.text)
		},
		methods: {
			//跳转
			authResult(text){
				this.searchHistoryList = this.setStrignItem(this.searchHistoryList, text)
				this.navTo('/pages/search-result/search-result?keyword='+text)
			},
			//清空
			empty() {
				uni.showModal({
					title: '',
					content: '是否要清除记录？',
					success: (res)=> {
						if (res.confirm) {
							uni.removeStorageSync('searchList')
							this.searchHistoryList = []
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
		},
	}
</script>

<style lang="scss">
	.search {
		padding: 0 20rpx;
	}
</style>
