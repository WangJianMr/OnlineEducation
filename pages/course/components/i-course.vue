<template>
	<view class="icourse">
			<view class="top" v-if="!corseList.isbuy || !corseList.type">
				<image :src="corseList.cover" mode=""></image>
				<view class="box">
					{{obj[corseList.type]}}
				</view>
			</view>
			
			<view class="" v-if="corseList.isbuy && corseList.type==='video'">
				<video :src="corseList.content" :poster="corseList.cover" style="width: 100%;height: 420rpx;"></video>
			</view>
			
			<view class="audio" v-if="corseList.isbuy && corseList.type==='audio'">
				<view class="image p-5 pb-1">
					<image :src="corseList.cover"></image>
				</view>
				<slider @change="handleChange" @changing="handleChanging" 
				:max="duration" :value="currentTime" block-size="15" block-color="#5fcc86" activeColor="#5fcc86"/>
				<view class="audioTime">
					<text>{{currentTime | filterTime}}</text>
					<text>{{duration | filterTime}}</text>
				</view>
				
				<view class="control p-5">
					<text :class="{activeColor:upFor}" class="iconfont icon-ziyuan11" @click="isFor"></text>
					<text :class="isPlay?'iconfont mx-3 icon-tianchongxing-':'iconfont mx-3 icon-bofang2'" @click="play"></text>
					<text class="iconfont icon-shoucang1"></text>
				</view>
			</view>
			
			
			<view class="group" v-if="corseList.group || corseList.flashsale">
				<!-- 拼团组件 -->
				<iGroup :groupObj="corseList.group || corseList.flashsale" :pic="corseList.price"></iGroup>
			</view>
			<view class="tabbar" v-if="coulom">
				<tabbar :tabbarList="tabbarList" :tabIndex="tabIndex"  @tabSwitchover="tabSwitchover"></tabbar>
			</view>
			
			<view class="footer" v-if="!coulom || !tabIndex">
				<view class="title text-ellipsis">
				   {{corseList.title}}
				</view>
				<view class="num">
					<text >{{corseList.sub_count}} 人学过</text>
					<text @click.stop="cutCollect" class="iconfont icon-shoucang1 icon" :class="{actives:corseList.isfava}"></text>
				</view>
				<view class="pic" v-if="!corseList.isbuy">
					<text class="currentPrice" v-if="corseList.price==='0.00'">免费</text>
					<text class="currentPrice" v-else>￥{{corseList.price}}</text>
					<text class="originalPrice"><s>￥{{corseList.t_price}}</s></text>
				</view>
			</view>
	</view>
</template>

<script>
	import iGroup from "./i-group.vue"
	import tabbar from "@/pages/tabbar/learn/components/tabbar.vue"
	import tool from "@/common/js/tool.js"
	export default{
		name:"iCourse",
		components:{
			iGroup,
			tabbar
		},
		props:{
			corseList:{
				type:Object,
				default:()=>{}
			},
			tabbarList:{
				type:Array,
				default:()=>['简介','目录']
			},
			tabIndex:{
				type:[Number,String],
				default:0
			},
			coulom:{
				type:Boolean,
				default:false
			},
			src:{
				type:String,
				default:""
			}

		},
		data() {
			return {
				obj:{
					"video":'视频',
					"media":"图文",
					"audio":"音频",
					"column":"专栏"
				},
				duration:1,
				currentTime:0,
				isfava:false,
				isPlay:false,
				upFor:false,
				_audioContext:null
			};
		},
		filters:{
			filterTime(s){
				if(s === 0){
					return '00:00:00'
				}
				
				return tool.formatSeconds(s)
			},
		},
		created() {
			// 初始化音频播放的实例对象
			console.log(this.src);
			this.createAudio()
		},
		beforeDestroy() {
			if(this._audioContext !== null && this.isPlay){
				this._audioContext.stop()
			}
		},
		methods:{
			createAudio(){
				// 创建音频播放的实例对象
				this._audioContext = uni.createInnerAudioContext()
				// 设置音频不进行自动播放
				this._audioContext.autoplay = false
				this._audioContext.src = this.src
				// 使用事件监听音频音频进入可以播放状态
				this._audioContext.onCanplay(()=>{
					console.log("音频进入可以播放状态")
					this.duration = this._audioContext.duration
					
				})
				// 使用事件监听音频正在播放的进度
				this._audioContext.onTimeUpdate(()=>{
					// 获取当前播放的音频的总时间
					this.duration = this._audioContext.duration
					// // 获取当前正在播放的进度时间
					this.currentTime = this._audioContext.currentTime
					
				})
				// 使用事件监听音频是否播放结束
				this._audioContext.onEnded(()=>{
					this.currentTime=0
					this.isPlay = false
					this._audioContext.stop()
				})
			},
			handleChange(e){
				this._audioContext.seek(e.detail.value)
			},
			handleChanging(e){
				this._audioContext.seek(e.detail.value)
			},
			//播放MP3
			play(){
				this.isPlay = !this.isPlay
				if(this.isPlay){
					this._audioContext.play()
				}else{
					this._audioContext.pause()
				}
				
			},
			//是否循环
			isFor(){
				this.upFor = !this.upFor
				this._audioContext.loop = this.upFor
				this.$utils.msg(this.upFor?'开启':'关闭')
			},
			tabSwitchover(index){
				this.$emit('tabSwitchover',index)
			},
			cutCollect(){
				this.$emit('cutCollect')
			},
		}
	}
</script>

<style lang="scss">
	.activeColor{
		color: #5ccc84 !important;
	}
	.audio{
		background-color:#f8f9fa;
		.image{
			// width: 650rpx;
			width: 100%;
			height: 450rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}
		}
		.audioTime{
			padding: 0 30rpx;
			font-size: 20rpx;
			position: relative;
			text{
				&:first-child{
					position: absolute;
					left: 30rpx;
					top: -20rpx;
				}
				&:last-child{
					position: absolute;
					right: 30rpx;
					top: -20rpx;
				}
			}
		}
		.control{
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				font-size: 60rpx;
				color: #bbbbbb;
				&:nth-of-type(2){
					font-size: 100rpx;
					color: #5ccc84;
				}
			}
		}
	}
	.tabbar{
		margin-top: 25rpx;
	}
	.icourse{
		width: 100%;
		background-color: #fff;
	}
	.top{
		width: 100%;
		height: 410rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.box{
			position: absolute;
			color: #fff;
			bottom: 20rpx;
			right: 20rpx;
			background-color: rgba(0, 0, 0, .3);
			font-size: 22rpx;
			padding: 5rpx 10rpx;
		}
	}
	.group{
		margin-top: 10rpx;
		height: 140rpx;
		width: 100%;
		background-color: #dc3545;
	}
	.footer{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40rpx 25rpx;
		.title{
			width: 100%;
			font-size: 40rpx;
			margin-top: 5rpx;
		}
		.num{
			font-size: 24rpx;
			padding: 20rpx 0;
			color: #888;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.icon{
				font-size: 48rpx
			}
			.actives{
				color: #6bd18f;
			}
		}
		.pic{
			position: relative;
			.currentPrice{
				color: #dc3545;
				font-size: 36rpx;
			}
			.originalPrice{
				color: #ccc;
				font-size: 22rpx;
				margin-left: 8rpx;
				position: absolute;
				bottom: 1rpx;
			}
		}
	}
</style>