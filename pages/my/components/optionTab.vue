<template>
	<view class="option">
		<view class="optionsListItem" v-for="(item,index) in optionList" :key="index">
			<view class="ele" v-for="(ele,i) in item" :key="i" @click="optionAuthTo(ele)" hover-class="active">
				<view class="left">
					<text class="icon" :class="ele.icon"></text>
					<text class="text">{{ele.title}}</text>
				</view>
				<view class="right">
					<text class="rightIcon"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myOptionList from "@/config/my-option-list.js"
	export default{
		name:"optionTab",
		props:{
			optionList:{
				type:Array,
				default:()=>myOptionList()
			}
		},
		methods:{
			optionAuthTo(ele){
					if(ele.login || this.$store.getters.getTokens){
						this.navTo(ele.page)
					}else{
						this.navTo('/pages/my/register')
					}
			},
		}
	}
</script>

<style lang="scss">
	.active{
		background-color: #ccc;
	}
	.option{
		margin-top: 80rpx;
		padding: 0 56rpx;
		.optionsListItem{
			.ele{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #eee;
				line-height: 117rpx;
				padding-right: 40rpx;
				&:last-child{
					border: 0;
				}
				.left{
					display: flex;
					align-items: center;
					.icon{
						font-size: 40rpx;
						color: rgb(67, 150, 236);
					}
					.text{
						display: inline-block;
						font-size: 28rpx;
						color: #3b4144;
						margin-left: 20rpx;
					}
				}
				.right{
					.rightIcon{
					    &::after{
							content: "";
							display: inline-block;
							width: 20rpx;
							height: 20rpx;
							border-right:4rpx solid #ccc;
							border-bottom:4rpx solid #ccc;
							transform: rotate(-45deg);
						}	
					}
				}
			}
		}
		
	}
</style>