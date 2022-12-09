<template>
	<view class="title">
		<h3>{{title}}</h3>
		<text @click="looks">{{look}}</text>
	</view>
</template>

<script>
	export default {
		name: "i-title",
		props: {
			title: {
				type: String,
				default: 's'
			},
			look: {
				type: String,
				default: ''
			},
		},
		created() {
			console.log(this.fw);
		},
		methods:{
			looks(){
				if(this.look==='清空全部'){
					this.$emit('empty')
				}
			},
		}
	}
</script>

<style lang="scss">

	.title {
		display: flex;
		justify-content: space-between;
		padding-top: 30rpx;
		font-size: 30rpx;

		text {
			font-size: 20rpx;
			color: #a9a5a0;
		}
	}
</style>
