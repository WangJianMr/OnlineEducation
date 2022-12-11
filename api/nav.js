import Http from "@/utils/request.js"
export default {
	//页面数据
	getCourseList(data,url){
		return Http.request({
			url:'/'+url,
			method:"get",
			data,
		})
	},

	
}