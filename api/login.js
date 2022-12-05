import Http from "@/utils/request.js"
export default{
	registerAccount(data){
		return Http.request({
			url:'/reg',
			data,
			method:"post",
			header:{
				token:null
			}
		})
	},
	getLogin(data){
		return Http.request({
			url:'/login',
			data,
			method:"post",
			header:{
				token:null
			}
		})
	},
	//获取验证码
	getCode(data){
		return Http.request({
			url:'/get_captcha',
			data,
			method:"post",
		})
	},
	//绑定手机号
	getBindingPhone(data){
		return Http.request({
			url:'/bind_mobile',
			data,
			method:"post",
		})
	},
	//找回密码
	getFindPassword(data){
		return Http.request({
			url:'/forget',
			data,
			method:"post",
		})
	},
	//退出登录
	getLoginOut(data){
		return Http.request({
			url:'/logout',
			data,
			method:"post",
		})
	},
	getCoupon(id){
		return Http.request({
			url:'/coupon?',
			method:"get",
		})
	},
	//编辑资料
	getEmitInfoMessage(data){
		return Http.request({
			url:'/update_info',
			method:"post",
			data,
		})
	},
	
	//修改密码
	getAmendPassword(data){
		return Http.request({
			url:'/update_password',
			method:"post",
			data,
		})
	},
	
}