<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<view class="df">
				<iOrderList v-for="(item,index) in navList" :key="index" :orderList="item" width="300rpx"
					:dfFlag="true"></iOrderList>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import navApi from "@/api/nav.js"
	import iOrderList from "@/pages/create-order/components/i-orderList.vue"
	export default {
		mixins: [MescrollMixin],
		components: {
			iOrderList
		},
		data() {
			return {
				downOption: {
					native: true // 必须配置此项，且需在pages.json配置"enablePullDownRefresh" : true

				},
				upOption: {
					noMoreSize: 0,
					textNoMore: "没有更多数据了",

					empty: "none",
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 10 //每页数据条数,默认10
					},
				},
				type: "",
				usable: "1",
				count: null,
				navList: [],
			};
		},
		onLoad(options) {
			this.type = options.module
		},
		mounted() {
			const title = this.type === 'live' ? '直播列表' : this.type === 'group' ? "拼团列表" : '秒杀列表'
			let dot = document.querySelector('.uni-page-head__title')
			dot.innerHTML = title
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if (this.type === 'live') {
					const res = await navApi.getCourseList({
						limit: page.size,
						page: page.num
					}, this.type + '/list')
					this.navList = this.navList.concat(res.data.data.rows)
					this.count = res.data.data.count

				} else {
					const res = await navApi.getCourseList({
						limit: page.size,
						page: page.num,
						usable: this.usable
					}, this.type)
					this.navList = this.navList.concat(res.data.data.rows)
					this.count = res.data.data.count

				}

				if (page.num === 0) {
					this.navList = []
				}
				this.mescroll.endBySize(this.navList.length, this.count);

			},
		}
	}
</script>

<style lang="scss">
	.df {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx;
	}
</style>
