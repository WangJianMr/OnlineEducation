<template>
	<view class="info" @click="myAuth">
		<view class="fdc">
			<view class="left">
				<image v-if="!getToken" src="../../../static/demo/banner/banner1.png" mode=""></image>
				<image v-if="getToken && infoList.imageUrl" src="../../../static/demo/banner/banner2.png" mode=""></image>
			</view>
			<view class="right">
				<view class="rightName">
					<text class="top">{{getToken?infoList.name:'立即登录'}}</text>
					<text class="vip" v-if="infoList.vip && getToken">{{infoList.vip}}</text>
				</view>
				<text class="bottom">{{getToken?infoList.descriptor:'登录解锁更多功能'}}</text>
			</view>
		</view>
		<view class="setting" v-if="getToken">
			<text class="iconfont icon-leimupinleifenleileibie set"></text>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from "vuex"
	import userInfoList from "@/config/my-info-list.js"
	import pagesMinis from "@/common/mixins/mixins.js"
	export default {
		mixins:["pagesMinis"],
		name:"Info",
		props:{
			infoList:{
				type:Object,
				default:()=>userInfoList()
			}
		},
		computed:{
			...mapGetters(['getToken'])
		},
		methods:{
			myAuth(){
				console.log(this.getToken);
				if(this.getToken){
					console.log('已登录');
				}else{
					this.navTo("/pages/my/register")
				}
			},
		}
	}
</script>

<style lang="scss">
	.info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 5rpx;
		margin-top: 15rpx;
		.fdc{
			display: flex;
			align-items: center;
		}
		.left{
			width: 125rpx;
			height: 125rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			line-height: 65rpx;
			color: #fff;
			margin-left: 25rpx;
			.rightName{
				display: flex;
				.top{
					font-size: 32rpx;
				}
				.vip{
					font-size: 26rpx;
					color: #f2c310;
					padding-top: 3rpx;
					padding-left: 35rpx;
				}
			}
			
			.bottom{
				font-size: 26rpx;
			}
		
		}
		.setting{
			
			.set{
				color: #fff;
			}
		}
	}
</style>