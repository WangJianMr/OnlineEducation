<template>
	<view class="tabbar">
		<view class="item" :class="{active:index==tabIndex}" v-for="(item,index) in tabbarList" :key="index" @click="tabSwitchover(index)">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabbar",
		props:{
			tabbarList:{
				type:Array,
				default:()=>[]
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		methods:{
			tabSwitchover(index){
				this.$emit('tabSwitchover',index)
			}
		}
	}
</script>

<style lang="scss">
	.tabbar{
		height: 70rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		border-bottom: 1rpx solid #eee;
		.item{
			color:#888888;
			font-size: 36rpx;
			position: relative;
			
		}
		.active{
			color: #01cf8a;
			font-weight: 700;
			&::after{
				content: '';
				width: 50rpx;
				height: 10rpx;
				background-color: #01cf8a;
				border-radius: 6rpx;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%);
			}
		}
	}
</style>