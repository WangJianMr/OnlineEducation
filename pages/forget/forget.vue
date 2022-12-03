<template>
	<view class="register">
		<view class="back" @click="navBack()"></view>

		<!-- 注册表单 -->
		<view class="regInput">
			<h2>找回密码</h2>
			<!-- 表单组件 -->
			<myInput v-model="form" :formList="formList" @getCode="getCode"></myInput>

			<!-- 注册/登录按钮 -->
			<view class="btn">
				<button @click="findPassword">立即找回</button>
			</view>
		</view>


	</view>
</template>

<script>
	import myInput from "@/pages/my/components/myInput.vue"
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
					password: "",
					repassword: "",
					phone:"",
					code:"",
				},
				//表单信息数据
				formList: [{
						type: 'text',
						prop: "phone",
						icon: "iconfont icon-icon-test",
						placeholder: "请输入手机号",
						show: false,
					},
					{
						type: 'text',
						icon: "iconfont icon-mima",
						placeholder: "验证码",
						show: false,
						prop: "code",
				
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
						show: false,
						prop: "repassword",
					}
				],
			};
		},
		computed: {
			...mapState(['phone'])
		},
		methods:{
			//获取验证码api
			async handelCode() {
				try {
					const res = await loginApi.getCode({phone:this.form.phone})
					if(res.statusCode!==200){
						this.$utils.msg(res.data.data)
					}else{
						this.setTiem()
						
						this.$utils.msg('已发送验证码')
					}
				} catch (e) {
				}
			},
		    //获取验证码按钮
		    getCode(){
		    	if(this.timeFlag) return
		    	this.handelCode()
		    },
			//找回密码api
			async handelFindPassword(){
				try{
					const res = await loginApi.getFindPassword(this.form)
					console.log(res);
					if(res.statusCode!==200){
						this.$utils.msg(res.data.data)
					}else{
						this.$utils.msg('找回成功')
						this.navBack()
						uni.hideLoading()
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//找回密码
			findPassword(){
				uni.showLoading({
					title:"提交中"
				})
				this.handelFindPassword()
			},
		},
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




		}
	}
</style>
