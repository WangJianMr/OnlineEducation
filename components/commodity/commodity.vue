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
				<view v-if="progress" class="con" style="font-size: 20rpx;color: #ccc;margin-top: -30rpx;">
				   学习进度
				</view>
				
				<view class="pic"  v-if="progress">
					<text class="currentPrice" style="font-size: 20rpx;">最近学习</text>
					<text class="originalPrice">已学习 {{item.progress}}%</text>
				</view>
				<view class="pic" v-else>
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
		created() {
			console.log(this.groupList);
		},
		methods:{
			commodityAuth(item){
				console.log(item);
				if(item.type=="column" || !item.type){
					if(item.group_id){
						this.navTo(`/pages/column/column?id=${item.id}&group_id=${item.group_id}`)
					}else{
						this.navTo(`/pages/column/column?id=${item.id}`)
					}
				}else{
					if(item.group_id){
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