<template>
	<view class="igroup">
		<view class="left">
			<view class="top">
				<text class="groupPic">￥{{groupObj.price}}</text>
				<text class="currentPrice"><s>￥{{pic}}</s></text>
			</view>
			<view class="footer">
				<button>{{groupObj.p_num}}人拼团</button>
			</view>
		</view>
		<view class="right">
			距结束<text class="box">{{date.D}}</text>天<text class="box">{{date.H}}</text>:<text  class="box">{{date.m}}</text>:<text  class="box">{{date.s}}</text>
		</view>
	</view>
</template>

<script>
	import dayjs from "dayjs"
	import 'dayjs/locale/zh-cn'
	export default {
		name: "group",
		props: {
			groupObj: {
				type: Object,
				default: () => {}
			},
			pic: {
				type: String,
				default: "",
			}
		},
		data() {
			return {
				date: {
					D: "",
					H: "",
					m: "",
					s: ""
				},
				tiem:null
			}
		},
		created() {
			this.timeRemaining()
			this.tiem = setInterval(()=>{
				this.timeRemaining()
			},1000)
		},
		destroyed() {
			this.tiem = null
		},
		methods: {
			timeRemaining() {
				let tirm = new Date(this.groupObj.end_time).getTime() - new Date().getTime()
				this.date.D = parseInt(tirm / 1000 / 60 / 60 / 24)
				this.date.H = parseInt(tirm / 1000 / 60 / 60 % 24)
				this.date.m = parseInt(tirm / 1000 / 60 % 60)
				this.date.s = parseInt(tirm / 1000 % 60)
			},

		}
	}
</script>

<style lang="scss">
	.igroup {
		display: flex;
		padding: 0 30rpx;
		justify-content: space-between;
		align-items: center;
		.left {
			height: 100%;
			line-height: 70rpx;

			.top {
				color: #fff;

				.groupPic {
					font-size: 30rpx;
				}

				.currentPrice {
					font-size: 22rpx;
					padding-left: 10rpx;
				}
			}

			.footer {
				width: 150rpx;

				button {
					width: 145rpx;
					height: 50rpx;
					display: flex;
					align-items: center;
					background-color: #fff;
					color: #dc3593;
					font-size: 24rpx;
					transform: scale(.9);
				}
			}
		}
		.right{
			color: #fff;
			font-size: 26rpx;
			.box{
				display: inline-block;
				margin: 0 7rpx;
				width: 50rpx;
				height: 50rpx;
				background-color: rgba(0, 0, 0, .2);
				text-align: center;
				line-height: 50rpx;
			}
		}
	}
</style>
