<template>
	<view class="register">
		<view class="back" @click="navBack()"></view>
		
		<!-- 注册表单 -->
		<view class="regInput">
			<h2>{{loginFlag?'登录':'注册'}}</h2>
			<myInput icon="iconfont icon-icon-test" placeholder="请输入用户名" type="text" v-model.sync="form.username"></myInput>
			<myInput icon="iconfont icon-mima" placeholder="请输入密码" type="password" v-model.sync="form.password"></myInput>
			<myInput v-if="!loginFlag" icon="iconfont icon-mima" placeholder="请输入确认密码" type="password" v-model.sync="form.repassword"></myInput>
			
			<view class="btn">
				<button>{{loginFlag?'登录':'注册'}}</button>
			</view>
			
			<view class="dfJcsb">
				<text class="goLogin" @click="loginFlag=!loginFlag">去登录</text>
				<text class="forget">忘记密码?</text>
			</view>
			
			<view class="footer">
				<text class="iconfont icon-weixindenglu icon"></text>
			</view>
			<view class="agreement"  v-if="loginFlag">
					<checkbox class="checkbox" :checked="checkFlag" />
					<text>已阅读并同意用户协议&隐私声明</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import myInput from "./components/myInput.vue"
	export default {
		components:{
			myInput,
		},
		data() {
			return {
				form:{
					username:"",
					password:"",
					repassword:""
				},
				checkFlag:false,//复选框状态
				loginFlag:true,//登录/注册切换
			};
		}
	}
</script>

<style lang="scss">
page,.register{
	height: 100%;
	background-image: linear-gradient(90deg,#3bfdaf,#70d6f2);
	overflow: hidden;
	.back{
		width: 25rpx;
		height: 25rpx;
		border-left:4rpx solid #fff;
		border-top:4rpx solid #fff;
		transform: rotate(-45deg);
		margin: 30rpx 0 0 38rpx;
	}
	.regInput{
		margin-top: 132rpx;
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-radius: 35rpx;
		padding: 55rpx 64rpx 0 70rpx;
		h2{
			font-weight: normal;
		}
		.btn>uni-button{
			background-color:#5ccc84 !important;
			color: #fff;
			margin-top: 50rpx;
			&::after{
				border: 0;
			}
		}
		.dfJcsb{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 70rpx;
			font-size: 30rpx;
			.goLogin{
				color: #5ccc84;
			}
			.forget{
				color: #a9a5a0;
			}
		}
		.footer{
			width: 100%;
			display: flex;
			justify-content: center;
			margin-top: 65rpx;
			.icon{
				font-size: 90rpx;
				color: #5ccc84;
			}
			
		}
		.agreement{
			display: flex;
			justify-content: center;
			align-items: center;
			.checkbox{
				transform:scale(0.7)
			}
			text{
				font-size: 26rpx;
				color: #aaa7a3;
			}
		}
	}
}
</style>
