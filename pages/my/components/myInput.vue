<template>
	<view class="myInut">
		<view class="inputItem">
			<text class="icon" :class="icon"></text>
			<input class="inout" :type="type" :placeholder="placeholder" v-model="value">
		</view>
		
	</view>
</template>

<script>
	export default{
		name:"myinput",
		props:{
			value:{
				type:[String,Number],
				default:""
			},
			icon:{
				type:String,
				default:""
			},
			type:{
				type:String,
				default:""
			},
			placeholder:{
				type:String,
				default:""
			}
		},
		
	}
</script>

<style lang="scss">
	.myInut{
		.inputItem{
			width: 615rpx;
			height: 95rpx;
			margin-top: 50rpx;
			background-color: #f5f5f5;
			display: flex;
			align-items: center;
			border-radius: 8rpx;
			.icon{
				width: 95rpx;
				text-align: center;
				color: rgb(51, 51, 51);
				font-size: 32rpx !important;
			}
			.inout{
				height: 95rpx;
				border: 0;
				background-color: transparent;
				outline: none;
				font-size: 34rpx;
			}
		}
	}
</style>