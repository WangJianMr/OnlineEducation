<template>
	<view class="p-2">
		<iModel width="100%" height="70rpx" oClass="rounded"></iModel>
		<iModel width="100%" height="300rpx" oClass="mt-2 rounded"></iModel>
		<view class="p-2 flex flex-wrap  align-center justify-center"  >
			<view style="width: 25%;" class="flex flex-column align-center mt-2" v-for="(item,index) in 8" :key="index">
				<iModel width="70rpx" height="70rpx" circle oClass="mb-2"></iModel>
				<iModel width="75rpx" height="30rpx" oClass="mb-2"></iModel>
			</view>
		</view>
		<view class="flex justify-between">
			<iModel width="49%" height="130rpx" oClass="mt-2"></iModel>
			<iModel width="49%" height="130rpx" oClass="mt-2"></iModel>
		</view>
		<iModel width="100rpx" height="40rpx" oClass="mt-4"></iModel>
		
		<view class="flex mt-4">
			<iModel width="300rpx" height="170rpx" oClass="mr-2"></iModel>
			<view class="">
				<iModel width="360rpx" height="40rpx" oClass="mb-2"></iModel>
				<iModel width="130rpx" height="30rpx" oClass="mb-2"></iModel>
				<iModel width="180rpx" height="50rpx"></iModel>
			</view>
		</view>
	</view>
	
</template>

<script>
	import iModel from "../model.vue"
	export default{
		components:{
			iModel
		},
		props:{},
	}
</script>

<style>
</style>