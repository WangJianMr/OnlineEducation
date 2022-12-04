<template>
	<view class="user_info">
		<optionList :optionList="optionList" :settingFlag="true" v-model="form" @sexChange="sexChange"
			@navTo="navTo('/pages/bind-phone/bind-phone')" @imageUrlSub="imageUrlSub"></optionList>
		<view class="btns">
			<button class="btn" @click="subAdd">提交</button>
		</view>
	</view>
</template>

<script>
	import optionList from "@/pages/my/components/optionTab.vue"
	import upLoad from "@/api/upload.js"
	import loginApi from "@/api/login.js"
	export default {
		name: "user_info",
		components: {
			optionList
		},
		data() {
			return {
				form: {
					nickname: this.$store.state.info.nickname,
					avatar: "",
					sex: this.$store.state.info.sex,
				},

				optionList: [
					[{
							title: '头像',
							event: "imageUrlSub",
							avatar: this.$store.state.info.avatar,
							prop: "avatar",
							image: true
						},
						{
							title: '昵称',
							prop: "nickname",
							type: "input",
							value: this.$store.state.info.nickname
						},
						{
							title: '性别',
							event: "sexChange",
							prop: "sex",
							rightText: this.$store.state.info.sex
						},
						{
							title: '手机',
							event: "navTo",
							rightText: this.$store.state.info.phone
						},
					]
				]
			};
		},
		created() {

		},
		methods: {
			//提交
			subAdd() {
				console.log(this.form);
				uni.showLoading({
					title: '加载中'
				});
				this.handelEmitOk()
				
			},
			//头像
			imageUrlSub() {
				this.imageUrl()
			},
			//编辑资料确认api
			async handelEmitOk() {
				try {
					const res = await loginApi.getEmitInfoMessage(this.form)
					console.log(res);
					if (res.statusCode !== 200) {
						console.log(789);
						this.$utils.msg(res.data.data)
					} else {
						uni.hideLoading()
						this.$utils.msg('提交成功')
						this.$store.commit('emitInfo',this.form)
						this.$store.commit('registerOk',this.$store.state.info)
						this.$store.commit('init')
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//换头像api
			async imageUrl() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: async (res) => {
						console.log(res);
						let file = res.tempFilePaths[0]
						const ss = await upLoad.uploadImg(file)
						console.log(ss);
						this.form.avatar = JSON.parse(ss.data).data
						console.log(this.form.avatar);
						this.$store.commit('emitInfo',{avatar:this.form.avatar})
						// this.$store.commit('init')
					}
				});
			},
			//性别
			sexChange() {
				let itemList = ['未知', '男', '女']
				uni.showActionSheet({
					itemList,
					success: (res) => {
						this.form.sex = itemList[res.tapIndex]
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.user_info {
		.btns {
			margin-top: 50rpx;
			width: 100%;
			padding: 0 20rpx;
		}

		.btn {
			background-color: #5ccc84;
			color: #fff;

			&::after {
				border: 0;
			}
		}
	}
</style>
