

class Http{
	static appid ='bd9d01ecc75dbbaaefce'
	static baseUrl = '/api'
	static request(options={}){
		console.log(options);
		return new Promise((resolve,reject)=>{
			uni.request({
			    url: Http.baseUrl + options.url, 
			    data:options.data || {},
			    header: {
					appid:Http.appid,
			        ...options.header
			    },
			    success: (res) => {
			        console.log(res);
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