<template>
	<view class="topic" v-if="examTopicList[num]" >
		<view class="time">
			考试时间 {{times}}
		</view>
		<view class="topItem">
			<view class="title_num">
				<view class="s" v-if="examTopicList[num]">
					{{obj[examTopicList[num].type]}}
				</view>
				<view class="num">
					第{{num+1}}题
				</view>
			</view>
			<view class="conent">
				<view class="title">
					{{examTopicList[num].title}}
				</view>
				<view v-if="examTopicList[num].type==='radio' ||examTopicList[num].type==='checkbox'||examTopicList[num].type==='trueOrfalse' " 
				class="item" v-for="(item,index) in examTopicList[num].options" :key="index" @click="select(item,index)">
					<view class="answer" :class="{active:(examTopicList[num].user_value==index && examTopicList[num].type!=='checkbox')||
					(arr[num] instanceof Array && arr[num].indexOf(item)>-1) && examTopicList[num].type!=='radio'}">
						<view class="order">
							{{index==0?'A':index==1?'B':'C'}}
						</view>
						<rich-text :nodes="item"></rich-text>
					</view>
				</view>
				
				<view class="answers" v-if="examTopicList[num].type==='completion'">
					<textarea placeholder="请输入答案..." class="texs" v-model="examTopicList[num].user_value[i]" v-for="(ele,i) in sum+1" :key="i"></textarea>
				</view>
				<view class="answers" v-if="examTopicList[num].type==='answer'">
					<textarea placeholder="请输入答案..." class="texs" v-model="examTopicList[num].user_value[0]"></textarea>
				</view>
				
				<button v-if="examTopicList[num].type==='completion'" @click="addTextarea">添加填空</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"topic",
		props:{
			times:{
				type:String,
				default:'01:00:00'
			},
			examTopicList:{
				type:Array,
				default:()=>[]
			},
			num:{
				type:[Number,String],
				default:0,
			},
			indexAct:{
				type:[Number,String],
				default:null,
			}
		},
		data(){
			return{
				obj:{
					completion:'填空题',
					radio:'单选题',
					checkbox:'多选题',
					answer:'问答',
					trueOrfalse:'判断'
				},
				arr:{},
				answerValue:"",
				arrs:{},
				sum:0
			}
		},
		created() {
			console.log(this.num);
		},
		methods:{
			select(item,index){
				console.log(index);
				if(this.examTopicList[this.num].type=='radio' || this.examTopicList[this.num].type=='trueOrfalse'){
					this.$emit('radioNum',index)
				}else if(this.examTopicList[this.num].type=='checkbox'){
					console.log(this.arr[index] instanceof Array);
					if( this.arr[this.num] instanceof Array===false){
						this.arr[this.num]=[]
						console.log(this.arr[this.num]);
					}
					if( this.arrs[this.num] instanceof Array===false){
						this.arrs[this.num]=[]
					}
				   let i = this.arr[this.num].findIndex(ele=>ele===item)
					if(i<0){
						this.arr[this.num].push(item)
						this.arrs[this.num].push(index)
					}else{
						this.arr[this.num].splice(i,1)
						this.arrs[this.num].splice(i,1)
					}
					console.log(this.arrs);
					this.$emit('checkboxArr',this.arrs[this.num],this.num)
				}
			},
			addTextarea(){
				this.sum+=1
			}

		},
	}
</script>

<style lang="scss">
	.topic{
		.time{
			line-height: 100rpx;
			border-top: 2rpx solid red;
			border-bottom: 2rpx solid red;
			color: red;
			text-align: center;
			font-size: 34rpx;
		}
		.topItem{
			
			.title_num{
				padding:20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				.num{
					font-size: 20rpx;
					color: #888;
				}
			}
			.conent{
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;
				.answer{
					padding: 20rpx 40rpx;
					display: flex;
					align-items: center;
					border: 1rpx solid #eee;
					margin-top: 30rpx;
					border-radius: 15rpx;
					.order{
						margin-right: 35rpx;
					}
				}
				.active{
					border:  1rpx solid #5ccc84;
					color: #5ccc84;
				}
			}
			.answers{
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.texs{
					margin-top: 20rpx;
					border: 1rpx solid #eee;
					padding: 20rpx;
				}
			}
			button{
				margin-top:20rpx;
				background-color: #5ccc84;
				color: #fff;
				&::after{
					border: 0;
				}
			}
		}
		
	}
</style>