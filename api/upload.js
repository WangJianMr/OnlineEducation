import upload from "@/utils/upload.js"
// 上传图像
const uploadImg = (file) => {
	return upload({url : '/upload', file})
}

export default {
	uploadImg
}