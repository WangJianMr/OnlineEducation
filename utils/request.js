
import store from "@/store/index.js"
class Http{
	static appid ='bd9d01ecc75dbbaaefce'
	static baseUrl = '/api'
	static request(options={}){
		return new Promise((resolve,reject)=>{
			uni.request({
			    url: Http.baseUrl + options.url, 
			    data:options.data || {},
			    header: {
					appid:Http.appid,
					token:store.state.token,
			        ...options.header
			    },
				method:options.method || "GET",
			    success: (res) => {
			        resolve(res)
			    },
				fail:(err)=>{
					console.log(err);
					reject(err)
				}
			});
		})
		
	}
}

export default Http