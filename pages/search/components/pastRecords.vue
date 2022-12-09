<template>
	<view class="recor">
		<iTitle title="历史记录" look="清空全部" @empty="empty"></iTitle>
		<view class="box">
			<view class="item text-ellipsis" v-for="(item,index) in list" :key="index">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	import iTitle from "@/components/i-title.vue"
	export default {
		name:"record",
		components:{
			iTitle,
		},
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			empty(){
				this.$emit('empty')
			},
		}
	}
</script>

<style lang="scss">
	.recor{
		.box{
			display: flex;
			flex-wrap: wrap;
			.item{
				max-width: 340rpx;
				padding:0 17rpx;
				background-color: #dae0e5;
				border-radius: 50rpx;
				margin-right: 15rpx;
				margin-top:20rpx;
				font-size: 26rpx;
			}
		}
		
	}
</style>