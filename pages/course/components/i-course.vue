<template>
	<view class="icourse">
			<view class="top">
				<image :src="corseList.cover" mode=""></image>
				<view class="box">
					{{obj[corseList.type]}}
				</view>
			</view>
			<view class="group" v-if="corseList.group">
				<!-- 拼团组件 -->
				<iGroup :groupObj="corseList.group" :pic="corseList.price"></iGroup>
			</view>
			<view class="tabbar" v-if="coulom">
				<tabbar :tabbarList="tabbarList" :tabIndex="tabIndex"  @tabSwitchover="tabSwitchover"></tabbar>
			</view>
			
			<view class="footer" v-if="!coulom || !tabIndex">
				<view class="title text-ellipsis">
				   {{corseList.title}}
				</view>
				<view class="num">
					<text>{{corseList.sub_count}} 人学过</text>
					<text @click.stop="cutCollect" class="iconfont icon-shoucang1 icon" :class="{actives:corseList.isfava}"></text>
				</view>
				<view class="pic">
					<text class="currentPrice" v-if="corseList.price==='0.00'">免费</text>
					<text class="currentPrice" v-else>￥2</text>
					<text class="originalPrice"><s>￥3</s></text>
				</view>
			</view>
	</view>
</template>

<script>
	import iGroup from "./i-group.vue"
	import tabbar from "@/pages/tabbar/learn/components/tabbar.vue"
	export default{
		name:"iCourse",
		components:{
			iGroup,
			tabbar
		},
		props:{
			corseList:{
				type:Object,
				default:()=>{}
			},
			tabbarList:{
				type:Array,
				default:()=>['简介','目录']
			},
			tabIndex:{
				type:[Number,String],
				default:0
			},
			coulom:{
				type:Boolean,
				default:false
			},

		},
		data() {
			return {
				obj:{
					"video":'视频',
					"media":"图文",
					"audio":"音频",
					"column":"专栏"
				},
				isfava:false,
			};
		},
		methods:{
			tabSwitchover(index){
				this.$emit('tabSwitchover',index)
			},
			cutCollect(){
				this.$emit('cutCollect')
			},
		}
	}
</script>

<style lang="scss">
	.tabbar{
		margin-top: 25rpx;
	}
	.icourse{
		width: 100%;
		background-color: #fff;
	}
	.top{
		width: 100%;
		height: 410rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.box{
			position: absolute;
			color: #fff;
			bottom: 20rpx;
			right: 20rpx;
			background-color: rgba(0, 0, 0, .3);
			font-size: 22rpx;
			padding: 5rpx 10rpx;
		}
	}
	.group{
		margin-top: 10rpx;
		height: 140rpx;
		width: 100%;
		background-color: #dc3545;
	}
	.footer{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40rpx 25rpx;
		.title{
			width: 100%;
			font-size: 40rpx;
			margin-top: 5rpx;
		}
		.num{
			font-size: 24rpx;
			padding: 20rpx 0;
			color: #888;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.icon{
				font-size: 48rpx
			}
			.actives{
				color: #6bd18f;
			}
		}
		.pic{
			position: relative;
			.currentPrice{
				color: #dc3545;
				font-size: 36rpx;
			}
			.originalPrice{
				color: #ccc;
				font-size: 22rpx;
				margin-left: 8rpx;
				position: absolute;
				bottom: 1rpx;
			}
		}
	}
</style>