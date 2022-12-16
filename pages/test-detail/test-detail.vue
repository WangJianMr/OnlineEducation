<template>
	<view class="detail">
		<iTopic :times="times" :num="nums" :indexAct="indexAct" :examTopicList="examTopicList" @radioNum="radioNum" @checkboxArr="checkboxArr"></iTopic>
		<view class="footers">
			<iFooter :num="nums+1" :total="examTopicList.length" @subNum="subNum" @addNum="addNum" @handInAnExamination="handInAnExamination"></iFooter>
		</view>
	</view>
</template>

<script>
	import examApi from "@/api/exam.js"
	import iFooter from "./components/topicFooter.vue"
	import iTopic from "./components/topicItem"
	export default {
		components: {
			iTopic,
			iFooter
		},
		data() {
			return {
				id: "",
				examTopicList: [],
				examInfo: {},
				num: null,
				times:'01:00:00',
				nums:0,
				indexAct:null,
				a:null
			};
		},
		onLoad(options) {
			this.id = options.id
			this.num = (1* 60 *60)
			this.handleExamTopic()
			this.handeltime()
			this.a = setInterval(()=>{
				this.handeltime()
			},1000)
		},
		destroyed() {
			this.a=null
		},
		methods: {
			//交卷api
			async HandInAnExamination(obj){
				try{
					const res = await examApi.getHandInAnExamination(obj)
					if(res.statusCode!==200){
						this.$utils.msg(res.data.data.slice(0,4)+'没有答题')
					}else{
						this.$utils.msg('交卷成功')
						setTimeout(()=>{
							this.navBack()
						},1000)
					}
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
			},
			// 交卷
			handInAnExamination(){
				let arrs = this.examTopicList.map(item=>item.user_value)
				let obj = {
					user_test_id:this.examInfo.user_test_id,
					value:arrs
				}
				uni.showModal({
					content: '确定要交卷吗',
					success:(res)=> {
						if (res.confirm) {
							this.HandInAnExamination(obj)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//减num
			subNum(val){
				this.nums--
				console.log(this.nums);
			},
			addNum(val){
				this.nums++
				console.log(this.nums);
			},
			//单选题选择
			radioNum(val){
				console.log(val);
				if(val instanceof Array){
					console.log(132);
				}
				this.examTopicList[this.nums].user_value = val 
				console.log(this.examTopicList);
			},
			//多选题选中
			checkboxArr(arr,num){
				this.examTopicList[this.nums].user_value=arr
				console.log(this.examTopicList);
			},
			//获取考试题api
			async handleExamTopic() {
				try {
					const res = await examApi.getExamTopic({
						id: this.id
					})
					console.log(res);
					if(res.statusCode!==200){
						this.$utils.msg(res.data.data)
						setTimeout(()=>{
							this.navBack()
						},1000)
						return
					}
					this.examTopicList = res.data.data.testpaper_questions
					this.examInfo = res.data.data
					console.log(this.examInfo);
				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
			},

			//获取时间
			handeltime() {
				this.num--
				let H = parseInt(this.num/ 60 / 60 % 24)
				H = H<1?'00':'0'+H
				let m = parseInt(this.num/ 60 % 60)
				m = m<10?'0'+m:m
				let s = parseInt(this.num % 60)
				s = s<10?'0'+s:s
				console.log();
				this.times = H+':'+m+':'+s
			},
		}
	}
</script>

<style lang="scss">
page,.detail{
	height: 100%;
	position: relative;
	.footers{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 30rpx;
	}
}
</style>
