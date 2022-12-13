<template>
	<view class="footer">
		<text class="iconfont icon-shangyibu icon" @click="subNum(num)" :class="{active:num<=1}"></text>
		<view class="cloum">
			<text class="iconfont icon-leimupinleifenleileibie icon"></text>
			<text><text class="c">{{num}}</text>/{{total}}</text>
		</view>
		<view class="cloum" @click="handInAnExamination">
			<text class="iconfont icon-tijiao icon"></text>
			<text>交卷</text>
		</view>
		<text class="iconfont icon-xiayibu icon" :class="{active:num>=total}" @click="addNum(num)"></text>
	</view>
</template>

<script>
	export default{
		name:"footers",
		props:{
			num:{
				type:[String,Number],
				default:1
			},
			total:{
				type:[String,Number],
				default:null
			}
		},
		methods:{
			subNum(num){
				if(this.num<=1) return
				this.$emit('subNum',num-1)
			},
			addNum(num){
				if(this.num>=this.total) return
				this.$emit('addNum',num-1)
			},
			//交卷
			handInAnExamination(){
				this.$emit('handInAnExamination')
			},
		}
	}
</script>

<style lang="scss">
	.footer{
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 24rpx;
		.cloum{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.icon{
			font-size: 40rpx;
		}
		.c{
			color: #5cd0b8;
		}
		.active{
			color: #ccc;
		}
	}
</style>