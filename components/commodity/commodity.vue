<template>
	<view class="commodity" :class="{active:dfFlag}">
		<view class="commodityItem" :class="{cativeCommodityItem:dfFlag}" v-for="(item,index) in groupList" :key="index" @click="commodityAuth(item)">
			<view class="top" :class="{activeTop:dfFlag}">
				<image :src="item.cover" mode=""></image>
				<view class="box">
					{{obj[item.type]}}
				</view>
			</view>
			<view class="footer">
				<view class="title text-ellipsis" :style="`width: ${width}`">
					{{item.title}}
				</view>
				<view class="pic">
					<text class="currentPrice" v-if="item.price==='0.00'">免费</text>
					<text class="currentPrice " v-else>￥{{item.price}}</text>
					<text class="originalPrice">￥{{item.t_price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"commodity",
		props:{
			groupList:{
				type:Array,
				default:()=>[]
			},
			width:{
				type:String,
				default:''
			},
			dfFlag:{
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
				return item
			}
		}
	}
</script>

<style lang="scss">
	.active{
		flex-direction: column;
	}
	.cativeCommodityItem{
		display: flex;
		margin-bottom: 40rpx;
		&:last-child{
			margin-bottom: 0;
		}
	}
	.activeTop{
		margin-right: 30rpx;
	}
	.commodity{
		display: flex;
		margin-top: 35rpx;
		padding-bottom: 20rpx;
		.commodityItem{
			margin-right: 20rpx;
			.top{
				min-width: 300rpx;
				width: 300rpx;
				height: 170rpx;
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
		}
	}

</style>