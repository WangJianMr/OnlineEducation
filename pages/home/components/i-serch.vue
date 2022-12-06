<template>
	<view class="serch">
		<view class="box">
			<text class="iconfont icon-nav_icon_shujuchaxun icon"></text>
			<input :type="serchList.type" :placeholder="serchList.placeholder" disabled>
		</view>
	</view>
</template>

<script>
	export default{
		name:"serch",
		props:{
			serchList:{
				type:Object,
				default:()=>{}
			}
		},
	}
</script>

<style lang="scss">
	.serch{
		width: 100%;
		height: 115rpx;
		background-color: #fff;
		padding: 16rpx;
		.box{
			height: 100%;
			background-color: rgba(0, 0, 0, .05);
			border-radius: 6rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #928e8a;
			.icon{
				font-size: 40rpx;
				margin-left: 110rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>