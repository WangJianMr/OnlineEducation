<template>
	<view class="bbsTop">
		<scroll-view class="scrollView" scroll-x="true" lower-threshold="70" @scrolltolower="scrolltolower">
			<view class="scroll">
				<view class="tpItem" :class="{active:index===bbsIndex}" v-for="(item,index) in bbsTopList" :key="index" @click="alterBbsIndex(index,item)">
					<view class="title">
						{{item.title}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		name:"tops",
		props:{
			bbsTopList:{
				type:Array,
				default:()=>[]
			},
			bbsIndex:{
				type:[Number,String],
				default:0
			},
			topCount:{
				type:[Number,String],
				default:0
			}
		},
		methods:{
			scrolltolower(e){
				if(this.bbsTopList.length<this.topCount){
					this.$emit("scrolltolower")
				}
			},
			alterBbsIndex(index,item){
				this.$emit("alterBbsIndex",index,item)
			},
		}
	}
</script>

<style lang="scss">
	.bbsTop{
		width: 100%;
		background-color: #fff;
		margin-bottom: 10rpx;
		.scrollView{
			width: 100%;
			white-space: nowrap !important;
			.scroll{
				display: flex;
				width: 100%;
				.tpItem{
					margin: 20rpx;
					background-color: #f8f9fa;
					padding:10rpx 25rpx;
					border-radius: 10rpx;
					border: 1rpx solid #c3c3c3;
					color: #7c858c;
				}
				.active{
					background-color: #5ccc84;
					color: #fff;
				}
			}
		}
		
		
	}
</style>