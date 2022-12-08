<template>
	<view class="columm">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback" @emptyclick="emptyClick">
			<scroll-view class="pp" scroll-y="true" >
					<iNewList :newList="colummList" :show="true"></iNewList>
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
		name: "columm",
		components:{
			iNewList
		},
		props:{
			page:{
				type:Object,
				default:()=>{}
			},
			istt:{
				type:Number,
				default:1
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
				colummList:[],
				count:null,
			}
		},
		created() {
			console.log(this.istt);
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				if (page.num === 1) {
					this.colummList = []
				}
				let type = this.istt? 'column' : 'course'
				let obj = {
					keyword: this.page.keyword,
					page: page.num,
					type
				}
				const {
					data
				} = await searchApi.getSearchList(obj)
				let arr = data.data.rows
				this.colummList = this.colummList.concat(arr)
				this.count = data.data.count
				this.mescroll.endBySize(this.colummList.length, this.count);
			},
		}
	}
</script>

<style lang="scss">
	.columm {
		width: 100%;
		height: 100%;
		.pp{
			padding: 0 20rpx;
		}
	}
</style>
