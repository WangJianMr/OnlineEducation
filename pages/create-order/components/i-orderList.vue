<template>
	<view class="order" :class="{activeOrder:dfFlag}" @click="commodityAuth(orderList)">
		<view class="top mr-2">
			<image :src="orderList.cover" mode=""></image>
			<view class="box">
				{{obj[orderList.type]}}
			</view>
		</view>
		<view :class="dfFlag?'activeFooter':'footer'">
			<view class="title text-ellipsis" :style="`width: ${width}`">
				{{orderList.title}}
				<view class="html">
					<rich-text :nodes="orderList.try"></rich-text>
				</view>
			</view>
			
			<view class="pic"  v-if="progress">
				<text class="currentPrice" style="font-size: 20rpx;">最近学习</text>
				<text class="originalPrice">已学习 {{orderList.progress}}%</text>
			</view>
			
			<view class="" v-if="!fava || !progress">
				<view class="pic text-ellipsis" v-if="dfFlag">
					<text class="text">秒杀价:</text>
					<text class="currentPic">￥{{orderList.price}}</text>
					<text class="originalPic">￥{{orderList.t_price}}</text>
				</view>
				
				<view class="pic" v-if="fava || !progress">
					<text class="currentPrice">￥{{orderList.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"orders",
		props:{
			orderList:{
				type:Object,
				default:()=>{}
			},
			width:{
				type:String,
				default:""
			},
			dfFlag:{
				type:Boolean,
				default:false
			},
			fava:{
				type:Boolean,
				default:false
			},
			progress:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				obj:{
					"video":'视频',
					"media":"图文",
					"audio":"音频",
					"column":"专栏"
				}
			};
		},
		methods:{
			commodityAuth(item){
				console.log(item);
				if(item.type=="column" || !item.type){
					if(item.flashsale_id){
						this.navTo(`/pages/column/column?id=${item.id}&flashsale_id=${item.flashsale_id}`)
					}else if(item.group_id){
						this.navTo(`/pages/column/column?id=${item.id}&group_id=${item.group_id}`)
					}else{
						this.navTo(`/pages/column/column?id=${item.id}`)
					}
					
				}else{
					if(item.flashsale_id){
						this.navTo(`/pages/course/course?id=${item.id}&flashsale_id=${item.flashsale_id}`)
					}else if(item.group_id){
						this.navTo(`/pages/course/course?id=${item.id}&group_id=${item.group_id}`)
					}else{
						this.navTo(`/pages/course/course?id=${item.id}`)
					}
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.html{
		font-size: 18rpx;
		color: #888;
		
	}
	.activeOrder{
		width: 50%;
		flex-direction: column;
		padding: 0 20rpx;
		margin-bottom: 0 !important;
	}
	.activeFooter{
		display: flex;
		flex-direction: column;
		justify-self: flex-start !important;
		.pic{
			white-space: nowrap;
			.text{
				color: #dc3545;
			}
			.currentPic{
				color: #dc3545;
				font-size: 34rpx;
			}
			.originalPic{
				font-size: 24rpx;color: #888;
			}
		}
		
	}
	
	.order{
		display: flex;
		justify-content: center;
		// align-items: center;
		padding:0 0 20rpx 0;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.top{
		min-width: 340rpx;
		width: 340rpx;
		height: 190rpx;
		position: relative;
		
		image{
			width: 100%;
			height: 100%;
		}
		.box{
			position: absolute;
			color: #fff;
			bottom: 10rpx;
			right: 10rpx;
			background-color: rgba(0, 0, 0, .3);
			font-size: 22rpx;
			padding: 5rpx 10rpx;
		}
	}
	.footer{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;	
		// margin-left: 20rpx;
		.title{
			width: 100%;
			font-size: 32rpx;
			margin-top: 5rpx;
		}
		.pic{
			.currentPrice{
				color: #dc3545;
				font-size: 36rpx;
			}
			.originalPrice{
				color: #ccc;
				font-size: 22rpx;
			}
			
		}
	}
</style>