<template>
	<view class="setting">
		<optionsList :optionList="optionList" :settingFlag="true" @clearCache="clearCache"></optionsList>
		<view class="btns" v-if="$store.getters.getTokens">
			<button @click="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import optionsList from "@/pages/my/components/optionTab.vue"
	import mySettingList from "@/config/my-setting-list.js"
	export default {
		components: {
			optionsList
		},
		data() {
			return {
				optionList: mySettingList(),
				tokenFlag:null,
			};
			
		},
		created() {
		},
		methods: {
			//清除缓存
			clearCache() {
				uni.showModal({
					content: "是否要清除缓存",
					success: (res) => {
						if (res.confirm) {
							this.optionList[0][1].rightText="0KB"
							this.$utils.msg('清除成功')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			//退出登录
			loginOut(){
				uni.showModal({
					content: "确定要退出吗",
					success:async (res) => {
						if (res.confirm) {
							const out = await this.$store.dispatch('loginOut')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
				
			},
		
		}
	}
</script>

<style lang="scss">
	.setting {
		.btns{
			width: 100%;
			padding: 0 20rpx;
			margin-top: 25rpx;
			button{
				background-color: #5ccc84;
				color: #fff;
				&::after{
					border: 0;
				}
			}
		}
	}
</style>
