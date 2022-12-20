import Http from "@/utils/request.js"
export default {
	//页面头部数据
	getBbsTopList(data){
		return Http.request({
			url:'/bbs',
			method:"get",
			data,
		})
	},
    //页面内容数据
	getBbsConentList(data){
		return Http.request({
			url:'/post/list',
			method:"get",
			data,
		})
	},
	//点赞
	getBbsGive(data){
		return Http.request({
			url:'/post/support',
			method:"post",
			data,
		})
	},
	//取消点赞
	getBbsCancelGive(data){
		return Http.request({
			url:'/post/unsupport',
			method:"post",
			data,
		})
	},
	//发布帖子
	getBbsPublishCap(data){
		return Http.request({
			url:'/post/save',
			method:"post",
			data,
		})
	},
	//帖子详情
	getBbsDetails(data){
		return Http.request({
			url:'/post/read',
			method:"get",
			data,
		})
	},
	//帖子评论详情
	getBbsCritic(data){
		return Http.request({
			url:'/post_comment',
			method:"get",
			data,
		})
	},
	//发表评论
	getBbsComment(data){
		return Http.request({
			url:'/post/reply',
			method:"post",
			data,
		})
	},
	
}