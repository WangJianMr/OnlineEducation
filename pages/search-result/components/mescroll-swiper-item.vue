<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
	<!-- top的高度等于悬浮菜单tabs的高度 -->
	 <mescroll-uni 
	 :ref="'mescrollRef'+i" 
	 @init="mescrollInit" 
	 :height="height" 
	 :down="downOption"
	  @down="downCallback" 
	  :up="upOption"
	   @up="upCallback" >
	   
	   
		<!-- 数据列表 -->
		<iNewList :newList="colummList" :show="true"></iNewList>
		
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
		import iNewList from "@/pages/home/components/i-newList.vue"
	// import {apiGoods} from "@/api/mock.js"
	import searchApi from "@/api/search.js"
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components: {
			iNewList
		},
		data() {
			return {
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					textNoMore:"没有更多数据了",
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						// btnText: '去看看'
					}
				},
				colummList: [] //列表数据
			}
		},
		props:{
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			height: [Number,String], // mescroll的高度
			page:{
				type:Object,
				default:()=>{}
			}
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				let type = this.page.type? 'column' : 'course'
				let obj = {
					keyword: this.page.keyword,
					page: page.num,
					type
				}
				const {
					data
				} = await searchApi.getSearchList(obj)
				if (page.num === 1) {
					this.colummList = []
				}
				let arr = data.data.rows
				this.colummList = this.colummList.concat(arr)
				this.count = data.data.count
				this.mescroll.endBySize(this.colummList.length, this.count);
			},
			// handleToDetails(id){
			// 	this.navTo("/pages/article/details?id=" + id)
			// }
		}
	}
</script>
