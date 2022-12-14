import Http from "@/utils/request.js"
export default {
	//我的订单
	getCourseList(data){
		return Http.request({
			url:'/course/read',
			method:"get",
			data,
		})
	},
	getOrder(data){
		return Http.request({
			url:'/goods/read',
			method:"get",
			data,
		})
	},
	//使用优惠价
	getUseSpecialRatesr(data){
		return Http.request({
			url:'/user_coupon/count',
			method:"get",
			data,
		})
	},
	//收藏
	getCollect(data){
		return Http.request({
			url:'/collect',
			method:"post",
			data,
		})
	},
	//取消收藏
	getCancelCollect(data){
		return Http.request({
			url:'/uncollect',
			method:"post",
			data,
		})
	},
	
}