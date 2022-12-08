import Http from "@/utils/request.js"
export default {
	//首页接口
	getHomeList(){
		return Http.request({
			url:"/index",
			method:"get"
		})
	},
	//优惠劵接口
	getCouponList(data){
		return Http.request({
			url:"/coupon",
			method:"get",
			data
		})
	},
	//拼团接口
	getGroupList(data){
		return Http.request({
			url:"/group",
			method:"get",
			data
		})
	},
	//领取优惠劵
	getCoupon(data){
		return Http.request({
			url:"/user_coupon/receive",
			method:"POST",
			data
		})
	},
}