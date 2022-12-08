
const pageMixins={
	data(){
		return{
			time:null,
			btnTextss:'发送',
			timeFlag:false,
		}
	},
	methods:{
		//跳转
		navTo(url,option={}){
			uni.navigateTo({
				url,
			})
		},
		//返回上一页
		navBack(delta = 1){
			uni.navigateBack({
				delta
			})
		},
		
		//定时器,发送按钮文字
		setTiem(){
			if(this.timeFlag) return
			this.timeFlag = true
			let num = 60
			this.time = setInterval(()=>{
				num--
				this.btnTextss = num + 's'
				if(num<=0){
					this.timeFlag = false
					this.btnTextss = '发送'
					clearInterval(this.time)
					this.time=null
				}
			},1000)
		},
		
		//本地存储
		setStrignItem(searchHistoryList,text){
			uni.getStorage({
				key: 'searchList',
				success: (res)=> {
					const arr = res.data
					let i = arr.findIndex(item=>item === text)
					if(i>=0) {
						let texts =  searchHistoryList[i]
						searchHistoryList.splice(i,1)
						searchHistoryList.unshift(texts)
					}else{
						searchHistoryList.unshift(text)
					}
					uni.setStorageSync('searchList',searchHistoryList)
				},
				fail:(err)=>{
					searchHistoryList.push(text)
				    uni.setStorageSync('searchList',searchHistoryList)
				}
			});
			return searchHistoryList
		},
	}
	
}



export default pageMixins