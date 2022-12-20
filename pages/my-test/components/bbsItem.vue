<template>
	<view class="bbsItem">
		<view class="top">
			<text class="title">{{item.testpaper.title}}</text>
			<text class="ok">考试完成</text>
		</view>
		<view class="conent">
			<div class="left">
				题目总数: {{item.testpaper.question_count}}
			</div>
			<view class="right">
				最终得分:{{item.read_status?'':'正在阅卷'}}
			</view>
		</view>
		
		<view class="footer">
			{{item.created_time}}
		</view>
	</view>
</template>

<script>
	export default{
		name:"bbsItem",
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		created() {
			console.log(this.item);
		}
	}
</script>

<style lang="scss">
	.bbsItem{
		border-top: 1rpx solid #eee;
		background-color: #fff;
		padding: 30rpx 0;
		margin-bottom: 10rpx;
		.top{
			
			display: flex;
			justify-content: space-between;
			padding:0 20rpx;
			.title{
				font-weight: 700;
			}
			.ok{
				color: #33ab4f;
				font-size: 24rpx;
			}
		}
		.conent{
			display: flex;
			padding: 30rpx 20rpx 50rpx ;
			border-bottom: 1rpx solid #eee;
			.left{
				width: 350rpx;
			}
			.right{
				color: #e54550;
			}
		}
		.footer{
			padding: 20rpx 0 0 20rpx;
			color: #ccc;
		}
	}
</style>