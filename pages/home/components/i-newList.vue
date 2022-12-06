<template>
	<view class="newList">
		<iTitle title="最新列表" look="查看更多"></iTitle>
		<icommodity :groupList="newList" width="360rpx" :dfFlag="true"></icommodity>
	</view>
</template>

<script>
	import iTitle from "@/components/i-title.vue"
	import icommodity from "@/components/commodity/commodity.vue"
	export default{
		name:"new",
		components:{
			iTitle,
			icommodity
		},
		props:{
			newList:{
				type:Array,
				default:()=>[]
			}
		},
	}
</script>

<style>
</style>