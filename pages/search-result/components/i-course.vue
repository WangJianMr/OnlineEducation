<template>
	<view class="course">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<scroll-view class="pp" scroll-y="true">
				<iNewList :newList="courseList" :show="true"></iNewList>
			</scroll-view>
		</mescroll-body>
	</view>
</template>

<script>
	import searchApi from "@/api/search.js"
	import iNewList from "@/pages/home/components/i-newList.vue"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		name: "course",
		components: {
			iNewList
		},
		props: {
			page: {
				type: Object,
				default: () => {}
			},
			istt: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				downOption: {
					native: true,

				},
				upOption: {
					noMoreSize: 0,
					textNoMore: "没有更多数据了",
					empty: "none",
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 5 //每页数据条数,默认10
					},
				},
				courseList: [],
				count: null,
			}
		},
		methods: {
			async upCallback(page) {
				if (page.num === 1) {
					this.searchList = []
				}
				let type = this.istt ? 'column' : 'course'
				let obj = {
					keyword: this.page.keyword,
					page: page.num,
					type
				}
				const {
					data
				} = await searchApi.getSearchList(obj)
				console.log(data);
				let arr = data.data.rows
				this.courseList = this.courseList.concat(arr)
				this.count = data.data.count
				this.mescroll.endBySize(this.courseList.length, this.count);
			}
		}
	}
</script>

<style lang="scss">
	.course {
		width: 100%;
		height: 100%;

		.pp {
			padding: 0 20rpx;
		}

		.ss {
			height: 300rpx;
		}
	}
</style>
