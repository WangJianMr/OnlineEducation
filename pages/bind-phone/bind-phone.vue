<template>
	<view class="phone">
		<view class="back" @click="navBack()"></view>
		<view class="phoneConent">
			<h2>绑定手机号</h2>

			<!-- //表单组件 -->
			<myInput v-model.sync="form" :formList="formList" :btnText="btnText" @getCode="getCode"></myInput>

			<!-- 绑定按钮 -->
			<view class="btn">
				<button @click="binding">绑定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import myInput from "../my/components/myInput.vue"
	import loginApi from "@/api/login.js"
	export default {
		components: {
			myInput,
		},
		data() {
			return {
				time:null,
				btnText:'发送',
				timeFlag:false,
				form: {
					phone: '',
					code: '',
				},
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

					}
				],
			};
		},
		methods: {
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
					//TODO handle the exception
				}
			},
			//绑定手机号api
			async handelBindingPhone(){
				try{
					const res = await loginApi.getBindingPhone(this.form)
					console.log(res);
					if(res.statusCode!==200){
						this.$utils.msg(res.data.data)
					}else{
						this.$utils.msg('已绑定成功')
						uni.hideLoading()
						uni.switchTab({
							url: '/pages/my/my'
						});
						this.$store.commit('setPhone',this.form.phone)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			//获取验证码按钮
			getCode(){
				if(this.timeFlag) return
				this.handelCode()
			},
			//绑定按钮
			binding(){
				uni.showLoading({
					title: ''
				});
				this.handelBindingPhone()
			},
			//定时器,发送按钮文字
			setTiem(){
				if(this.timeFlag) return
				this.timeFlag = true
				let num = 60
				this.time = setInterval(()=>{
					num--
					this.btnText = num + 's'
					if(num<=0){
						this.timeFlag = false
						this.btnText = '发送'
						clearInterval(this.time)
						this.time=null
					}
				},1000)
			},
		}
	}
</script>

<style lang="scss">
	page,
	.phone {
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

		.phoneConent {
			margin-top: 132rpx;
			width: 100%;
			height: 100%;
			background-color: #fff;
			border-radius: 35rpx;
			padding: 55rpx 64rpx 0 70rpx;

			h2 {
				font-weight: normal;
			}
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
</style>
