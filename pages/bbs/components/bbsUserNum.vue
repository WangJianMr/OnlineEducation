<template>
	<view class="userNum">
		<h3 class="invitationNum">总帖子 <text>{{postCount}}</text> </h3>
		<h3 class="usNum">总用户 <text>{{userCount}}</text> </h3>
	</view>
</template>

<script>
	export default{
		name:"userNum",
		props:{
			postCount:{
				type:[Number,String],
				default:0
			},
			userCount:{
				type:[Number,String],
				default:0
			}
		},
		methods:{},
	}
</script>

<style lang="scss">
	.userNum{
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0;
		background-color: #fff;
		color:#6c757d;
		font-size: 30rpx;
		text{
			font-weight: normal;
			padding-left: 20rpx;
		}
		margin-bottom: 10rpx;
	}
</style>