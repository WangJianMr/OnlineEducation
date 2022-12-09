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
}