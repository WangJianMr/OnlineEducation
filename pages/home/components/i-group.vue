<template>
	<view class="group">
		<iTitle title="拼团" look=""></iTitle>
		<scroll-view scroll-x="true" class="scroll">
			<icommodity :groupList="groupList" width="300rpx" ref="commoditys" @click.native="handelAuth"></icommodity>
		</scroll-view>
	</view>
</template>

<script>
	import iTitle from "@/components/i-title.vue"
	import icommodity from "@/components/commodity/commodity.vue"
	export default{
		name:"group",
		components:{
			iTitle,
			icommodity
		},
		props:{
			groupList:{
				type:Array,
				default:()=>[]
			},
			count:{
				type:[Number,String],
				default:null
			}
		},
		methods:{
			async handelAuth(){
			},
		}
		
	}
</script>

<style lang="scss">
	.group{
		margin-bottom: 20rpx;
		.scroll{
			white-space: nowrap;
		}
	}
</style>