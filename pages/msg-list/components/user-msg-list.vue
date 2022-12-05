<template>
	<view class="msg">
		<view class="msg-item" v-for="(item,index) in msgList" :key="index">
			<view class="item-top">
				{{item.content}}
			</view>
			<view class="item-footer">
				{{item.created_time}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"userMsg",
		props:{
			msgList:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return{
				
			}
		},
	}
</script>

<style lang="scss">
	.msg{
		width: 100%;
		padding: 0 20rpx;
		.msg-item{
			margin-top: 20rpx;
			background-color: #fff;
			padding: 25rpx;
			.item-footer{
				margin-top: 10rpx;
				font-size: 22rpx;
				color: #aaa;
			}
		}
	}
</style>