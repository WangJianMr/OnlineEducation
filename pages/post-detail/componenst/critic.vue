<template>
	<view class="crictc">
		<view class="item" v-for="(item,index) in criticList" :key="index" @click="toggle('bottom',item)">
			<view class="image">
				<image :src="item.user.avatar" mode=""></image>
			</view>
			<view class="right">
				<text class="name">{{item.user.name}}</text>
				<text class="cont">{{item.content}}</text>
				
				<uni-dateformat class="time" :date="item.created_time" 
				:format="`yyyy-MM-dd ${(new Date(item.created_time).getTime()/1000/60/60%24)*2<12?'上午':'下午'} hh:mm`"></uni-dateformat>
				
				<view class="cri">
					<critic :criticList="item.post_comments"></critic>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default{
		name:"critic",
		props:{
			criticList:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			toggle(type,item){
				console.log(item);
				this.$emit('toggle',type,item.id,item.user)
			}
		}
	}
</script>

<style lang="scss">
	.crictc{
		width: 100%;
		.item{
			width: 100%;
			padding: 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			.image{
				width: 70rpx;
				height:70rpx;
				border-radius: 50%;
				background-color: #f5f5f5;
				margin-right: 20rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.right{
				width: 100%;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 22rpx;
					color: #008eff;
				}
				.cont{
					padding: 5rpx 0;
				}
				.time{
					font-size: 22rpx;
					color: #888;
				}
				.cri{
					width: 100%;
					background-color: #f8f9fa;
				}
			}
		}
	}
</style>