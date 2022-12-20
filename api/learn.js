import Http from "@/utils/request.js"
export default {
	//课程/专栏数据
	getLearn(data){
		return Http.request({
			url:'/user_history/list',
			method:"get",
			data,
		})
	},
	//考试记录
	getBbs(data){
		return Http.request({
			url:'/user_test/list',
			method:"get",
			data,
		})
	},
	//我的帖子
	getUserBbs(data){
		return Http.request({
			url:'/mypost',
			method:"get",
			data,
		})
	},
	//删除帖子
	getDelBbs(data){
		return Http.request({
			url:'/post/delete',
			method:"post",
			data,
		})
	},
	
}