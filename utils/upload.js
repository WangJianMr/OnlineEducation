import store from "@/store/index.js"
const upLoad = (option)=>{
	return new Promise((resolve,reject)=>{
		store.commit('init')
		console.log(store.getters.getTokens);
		if(!store.getters.getTokens){
			uni.navigateTo({
				url:"/pages/my/register"
			})
			return
		}
		uni.uploadFile({
			url: 'http://demonuxtapi.dishait.cn/mobile'+option.url,
			filePath: option.file || "",
			name: option.name || 'file',
			formData: option.formData || {},
			header:{
				token:store.state.token,
				appid:'bd9d01ecc75dbbaaefce',
				...option.header
			},
			success: (res) => {
				resolve(res)
			}
		});
	})
}
export default upLoad