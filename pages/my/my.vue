<template>
	<view class="my animate__animated animate__fadeInDown">
		<view class="userInfo">
			<!-- 个人信息 -->
			<iInfo :getToken="getToken" :infoList="infoList"></iInfo>
			<!-- nav -->
			<navBar></navBar>
			
		</view>
		<!-- 选项菜单组件 -->
		<optionTab></optionTab>
	</view>
</template>

<script>
	//个人信息、登录组件
	import iInfo from "./components/userInfo.vue"
	//nav组件
	import navBar from "./components/navBar.vue"
	//选项菜单组件
	import optionTab from "./components/optionTab.vue"
	import {mapGetters} from "vuex"
	export default {
		components:{
			iInfo,
			navBar,
			optionTab
		},
		data() {
			return {
				getToken:false,
				infoList:{},
			};
		},
		computed:{
			...mapGetters(['getTokens'])
		},
		onShow() {
			
			this.infoList = uni.getStorageSync('info') || {}
			this.getToken = !!uni.getStorageSync('token')
		}
	}
</script>

<style lang="scss">。
page,.my{
	height: 100%;
	background-color: #fff;
	 --animate-duration: .5s;
	  --animate-delay: .5s;
	  --animate-repeat: .5;
}
.userInfo{
	height: 320rpx;
	background-color: #5ccc84;
	padding: 20rpx;
	border-radius: 0 0 48rpx 48rpx;
}
</style>
