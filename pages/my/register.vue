<template>
	<view class="register">
		<view class="back" @click="navBack()"></view>

		<!-- 注册表单 -->
		<view class="regInput">
			<h2>{{loginFlag?'登录':'注册'}}</h2>
			
			<!-- 表单组件 -->
			<myInput v-model="form" :formList="formList"></myInput>

			<!-- 注册/登录按钮 -->
			<view class="btn">
				<button @click="loginGo">{{loginFlag?'登录':'注册'}}</button>
			</view>

			<view class="dfJcsb">
				<text class="goLogin" @click="loginFlagChange">{{loginFlag?'去注册':'去登录'}}</text>
				<text class="forget" @click="forgetPassword">忘记密码?</text>
			</view>

			<view class="footer">
				<text class="iconfont icon-weixindenglu icon"></text>
			</view>
			<view class="agreement" v-if="loginFlag">
				<checkbox-group @change="checkFlagChange">
					<checkbox class="checkbox" value="xz" :checked="checkFlag" />
				</checkbox-group>
				<text>已阅读并同意用户协议&隐私声明</text>
			</view>
		</view>


	</view>
</template>

<script>
	import myInput from "./components/myInput.vue"
	import loginApi from "@/api/login.js"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			myInput,
		},
		data() {
			return {
				form: {
					username: "",
					password: "",
					repassword: "",
				},
				//表单信息数据
				formList: [{
						type: 'text',
						prop: "username",
						icon: "iconfont icon-icon-test",
						placeholder: "请输入用户名",
						show: false,
					},
					{
						type: 'password',
						icon: "iconfont icon-mima",
						placeholder: "请输入密码",
						show: false,
						prop: "password",

					},
					{
						type: 'password',
						icon: "iconfont icon-mima",
						placeholder: "请输入确认密码",
						show: true,
						prop: "repassword",
					},
				],
				checkFlag: false, //复选框状态
				loginFlag: true, //登录/注册切换
			};
		},
		computed: {
			...mapState(['phone'])
		},
		methods: {
			loginGo() {
				if (this.loginFlag) {
					if (!this.checkFlag) {
						this.$utils.msg('请先阅读并同意用户协议&隐私声明')
						return
					}
					uni.showLoading({
						title: ''
					});
					this.handelLoginOk()
				} else {
					uni.showLoading({
						title: ''
					});
					this.handelLogin()

				}
			},
			//登录账号api
			async handelLoginOk() {
				try {
					const res = await loginApi.getLogin(this.form)
					uni.hideLoading()
					if (res.statusCode !== 200) {
						this.$utils.msg(res.data.data)
					} else {
						this.$utils.msg('登陆成功')
						this.$store.commit('registerOk', res.data.data)
						console.log(this.phone);
						if (!res.data.data.phone) {
							this.navTo('/pages/bind-phone/bind-phone')
						} else {
							uni.switchTab({
								url: '/pages/my/my'
							});
							this.$store.commit('init')
						}
						
					}

				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
			},
			//注册账号api
			async handelLogin() {
				try {
					const res = await loginApi.registerAccount(this.form)
					if (res.statusCode !== 20000) {
						this.$utils.msg(res.data.data)
					}
					if (res.data.code === 20000) {
						this.$utils.msg('注册成功')
						this.form = {
							username: "",
							password: "",
							repassword: "",
						}
						this.loginFlagChange()
					}

					uni.hideLoading()
				} catch (e) {
					//TODO handle the exception
				}
			},
			//注册/登录状态
			loginFlagChange() {
				this.form={
					username: "",
					password: "",
					repassword: "",
				}
				this.loginFlag = !this.loginFlag
				this.formList[2].show = this.loginFlag
			},
			//切换复选框状态
			checkFlagChange(e) {
				if (e.detail.value.length) {
					this.checkFlag = true
				} else {
					this.checkFlag = false
				}
			},
			//忘记密码
			forgetPassword(){
				this.navTo('/pages/forget/forget')
			},
		}
	}
</script>

<style lang="scss">
	page,
	.register {
		height: 100%;
		background-image: linear-gradient(90deg, #3bfdaf, #70d6f2);
		overflow: hidden;

		.back {
			width: 25rpx;
			height: 25rpx;
			border-left: 4rpx solid #fff;
			border-top: 4rpx solid #fff;
			transform: rotate(-45deg);
			margin: 30rpx 0 0 38rpx;
		}

		.regInput {
			margin-top: 132rpx;
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 35rpx;
			padding: 55rpx 64rpx 0 70rpx;

			h2 {
				font-weight: normal;
			}

			.btn>uni-button {
				background-color: #5ccc84 !important;
				color: #fff;
				margin-top: 50rpx;

				&::after {
					border: 0;
				}
			}

			.dfJcsb {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 70rpx;
				font-size: 30rpx;

				.goLogin {
					color: #5ccc84;
				}

				.forget {
					color: #a9a5a0;
				}
			}

			.footer {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-top: 65rpx;

				.icon {
					font-size: 90rpx;
					color: #5ccc84;
				}

			}

			.agreement {
				display: flex;
				justify-content: center;
				align-items: center;

				.checkbox {
					transform: scale(0.7)
				}

				text {
					font-size: 26rpx;
					color: #aaa7a3;
				}
			}
		}
	}
</style>
