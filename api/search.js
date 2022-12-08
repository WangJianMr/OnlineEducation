import Http from "@/utils/request.js"
export default {
	//我的订单
	getSearchList(data){
		return Http.request({
			url:'/search',
			method:"get",
			data,
		})
	},
}