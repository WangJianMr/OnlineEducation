import Http from "@/utils/request.js"
export default {
	//页面数据
	getExamItem(data){
		return Http.request({
			url:'/testpaper/list',
			method:"get",
			data,
		})
	},
	//题目数据
	getExamTopic(data){
		return Http.request({
			url:'/testpaper/read',
			method:"get",
			data,
		})
	},
	//交卷
	getHandInAnExamination(data){
		return Http.request({
			url:'/user_test/save',
			method:"post",
			data,
		})
	}

	
}