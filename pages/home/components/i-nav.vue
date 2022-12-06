<template>
	<view class="nav">
		<view class="navitem" v-for="(item,index) in homeNavList" :key="index">
			<view class="images">
				<image :src="item.src" mode=""></image>
			</view>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		name:"Inav",
		props:{
			homeNavList:{
				type:Array,
				default:()=>[]
			}
		},
	}
</script>

<style lang="scss">
	.nav{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-top: 15rpx;
		.navitem{
			flex: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 25rpx;
			.images{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			text{
				font-size: 26rpx;
				color: #6c757d;
				margin-top: 10rpx;
			}
		}
	}
</style>