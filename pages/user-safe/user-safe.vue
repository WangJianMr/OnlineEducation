<template>
	<view class="safe">
		<optionList :optionList="optionList" :settingFlag="true" v-model="form"></optionList>
		<view class="btns">
			<button class="btn" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
	import optionList from "@/pages/my/components/optionTab.vue"
	import loginApi from "@/api/login.js"
	export default {
		components: {
			optionList
		},
		data() {
			return {
				form: {
					opassword: '',
					password: "",
					repassword: "",
				},
				optionList: [
					[{
							title: '原密码',
							prop: "opassword",
							type: "input",
							value: '请输入原密码'
						},
						{
							title: '新密码',
							prop: "password",
							type: "input",
							value: '请输入新密码'
						},
						{
							title: '确认密码',
							prop: "repassword",
							type: "input",
							value: '请输入确认密码'
						},
					]
				]
			};
		},
		methods:{
			//保存
			save(){
				uni.showLoading({
					title:"加载中"
				})
				this.handelAmendPassword()
			},
			//修改密码api
		    async handelAmendPassword(){
				try{
					const res = await loginApi.getAmendPassword(this.form)
					uni.hideLoading()
					if(res.statusCode!==200){
						this.$utils.msg(res.data.data)
					}else{
						this.$utils.msg('修改密码成功')
						this.navBack()
						uni.clearStorageSync()
						this.$store.commit('init')
						loginApi.getCoupon()
					}
					console.log(res);
				}catch(e){
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="scss">
	.btns{
		width: 100%;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}
	.btn {
		background-color: #5ccc84;
		color: #fff;
		
		&::after {
			border: 0;
		}
	}
</style>
