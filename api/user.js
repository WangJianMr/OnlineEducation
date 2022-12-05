import Http from "@/utils/request.js"
export default {
	//我的订单
	getUserOrder(data){
		return Http.request({
			url:'/order/list',
			method:"get",
			data,
		})
	},
	//我的消息
	getUserMessage(data){
		return Http.request({
			url:'/notice/list',
			method:"get",
			data,
		})
	},
}