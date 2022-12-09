<template>
	<view class="option" :class="{settingFlags:settingFlag}">
		<view class="optionsListItem" v-for="(item,index) in optionList" :key="index">
			<view class="ele" :class="{settingBor:settingFlag,h:ele.rightRate||ele.rightPay}" v-for="(ele,i) in item" :key="i"
				@click="optionAuthTo(ele)" :hover-class="ele.event?'active':''">
				<view class="left">
					<text v-if="ele.icon" class="icon" :class="ele.icon"></text>
					<text class="text">{{ele.title}}</text>
				</view>
				<view class="right">
					<view class="image" v-if="ele.image">
						<image v-if="ele.avatar" :src="avater || ele.avatar" mode=""></image>
					</view>
					<view class="input">
						<input v-if="ele.type=='input'" type="text" :placeholder="ele.value" v-model="value[ele.prop]">
					</view>
					<text @click.stop="useCoupn(ele)" v-if="ele.rightRate" :class="{fs:ele.rightRate}">{{num>0?`可用优惠劵(${num}张)`:''}}</text>
					<text v-if="ele.rightPay" :class="{cor:ele.rightPay}">{{ele.rightPay}}</text>
					<text v-if="ele.rightIcon" class="rightIcon"></text>
					<text v-if="ele.rightText && ele.prop!='sex'">{{ele.rightText}}</text>
					<text v-if="ele.prop=='sex'">{{value.sex}}</text>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myOptionList from "@/config/my-option-list.js"
	export default {
		name: "optionTab",
		props: {
			optionList: {
				type: Array,
				default: () => myOptionList()
			},
			settingFlag: {
				type: Boolean,
				default: false
			},
			value:{
				type:Object,
				default:()=>{}
			},
			num:{
				type:Number,
				default:null
			},
			id:{
				type:Number,
				default:null
			}
		},
		computed:{
			avater(){
				return this.value.avatar
			}
		},
		methods: {
			optionAuthTo(ele) {
				if(ele.event){
					this.$emit(ele.event)
					return
				}
				if (ele.login || this.$store.getters.getTokens ) {
					this.navTo(ele.page)
					return
				} else {
					this.navTo('/pages/my/register')
					return
				}
			},
			useCoupn(ele){
				this.navTo(ele.page+`?goods_id=${this.id}&type=course`)
			},		
		}
	}
</script>

<style lang="scss">
	.active {
		background-color: #f1f1f1;
	}
	.h{
		line-height: 80rpx !important;
	}
	.fs{
		font-size: 22rpx;
		padding-right: 20rpx;
	}
	.cor{
		color: #30ab78;
	}

	.settingFlags {
		margin-top: 0 !important;
		padding: 0 0 0 15rpx !important;
	}

	.settingBor {}

	.option {
		margin-top: 80rpx;
		padding: 0 40rpx;

		.optionsListItem {
			.ele {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #f1f1f1;
				line-height: 110rpx;
				padding-right: 40rpx;
				&:last-child {
					border: 0;
				}

				.left {
					display: flex;
					align-items: center;

					.icon {
						font-size: 40rpx;
						color: rgb(67, 150, 236);
					}

					.text {
						display: inline-block;
						font-size: 28rpx;
						color: #3b4144;
						margin-left: 20rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;
					.rightIcon {
						&::after {
							content: "";
							display: inline-block;
							width: 20rpx;
							height: 20rpx;
							border-right: 4rpx solid #ccc;
							border-bottom: 4rpx solid #ccc;
							transform: rotate(-45deg);
						}
					}
					.image{
						width: 83rpx;
						height: 83rpx;
						border-radius: 50%;
						background-color: #f8f9fa;
						margin: 15rpx 0;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.input{
						
						input{
							text-align: right;
							height: 110rpx;
						}
					}
					
				}
			}
		}

	}
</style>
