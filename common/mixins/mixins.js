
const pageMixins={
	data(){
		return{
			time:null,
			btnText:'发送',
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
				this.btnText = num + 's'
				if(num<=0){
					this.timeFlag = false
					this.btnText = '发送'
					clearInterval(this.time)
					this.time=null
				}
			},1000)
		},
	}
	
}



export default pageMixins