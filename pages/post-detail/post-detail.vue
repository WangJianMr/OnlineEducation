<template>
	<view class="detail">
		<view class="top">
			<iContent :bbsList="detailList" :footerFlag="true"></iContent>
		</view>

		<view class="con">
			<iCricitc :criticList="criticList" @toggle="toggle"></iCricitc>
			<button @click="toLoad" :disabled="criticList.length===count">{{criticList.length===count?'没有更多了':'点我加载更多'}}</button>
		</view>


		<view class="footer" v-if="detailList[0]">
			<input type="text" placeholder="说一句吧" disabled @click="toggle('bottom',0,{})">
			<view class="icon" :class="{active:detailList[0].issupport}" @click="give(detailList[0])">
				<text class="iconfont icon-dianzan2 s"></text>
				<text>{{detailList[0].support_count}}</text>
			</view>
		</view>


		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="top">
						<text>发表</text>
						<button size="mini" :disabled="content.length<1?true:false" :class="{btnActive:content.length}" @click="send">发送</button>
					</view>
					<textarea placeholder="发表评论..." v-model="content"></textarea>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import iContent from "@/pages/bbs/components/bbsContent.vue"
	import iCricitc from "./componenst/critic.vue"
	import bbsApi from "@/api/bbs.js"
	export default {
		components: {
			iContent,
			iCricitc
		},
		data() {
			return {
				id: null,
				detailList: [],
				criticList: [],
				count: 0,
				num: 1,
				type:"",
				replu_id:"",
				content:"",
				reply_user:{},
			}
		},
		onLoad(options) {
			this.id = options.id
			this.handelBbsDetail()
			this.handelCritic(true)
		},
		methods: {
			//评论api
			async handelComment(){
				try{
					let obj = {}
					if(this.replu_id){
						obj={
							content:this.content,
							reply_id:this.replu_id,
							post_id:Number(this.id),
							reply_user:this.reply_user
						}
					}else{
						obj={
							content:this.content,
							reply_id:this.replu_id,
							post_id:Number(this.id),
						}
					}
					const res = await bbsApi.getBbsComment(obj)
					this.num = 1
					this.content = ""
					this.replu_id = 0
					this.reply_user={}
					this.$utils.msg('评论成功')
					this.$refs.popup.close()
					this.handelCritic(true)
					
				}catch(e){
					console.log(e);
					//TODO handle the exception
				}
			},
			toggle(type,id,user) {
				this.type = type
				this.replu_id = id
				this.reply_user = user
				this.reply_user.username = user.name
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			//发表评论
			send(){
				console.log(this.replu_id);
				this.handelComment()
			},
			//点赞
			give(item) {
				console.log(item);
				if (item.issupport) {
					this.handelCancelGive(item.id)
				} else {
					this.handelGive(item.id)
				}

			},
			//取消点赞api
			async handelCancelGive(id) {
				try {
					const res = await bbsApi.getBbsCancelGive({
						post_id: id
					})
					if (res.statusCode === 200) {
						this.$utils.msg('取消成功')
						this.detailList[0].issupport = false
						this.detailList[0].support_count -= 1
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//点赞api
			async handelGive(id) {
				try {
					const res = await bbsApi.getBbsGive({
						post_id: id
					})
					if (res.statusCode === 200) {
						this.$utils.msg('点赞成功')
						this.detailList[0].issupport = true
						this.detailList[0].support_count += 1
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//详情信息api
			async handelBbsDetail() {
				try {
					const res = await bbsApi.getBbsDetails({
						id: this.id
					})
					this.detailList = []
					this.detailList.push(res.data.data)
				} catch (e) {
					//TODO handle the exception
				}
			},
			//评论信息api
			async handelCritic(flag) {
				try {
					const res = await bbsApi.getBbsCritic({
						post_id: this.id,
						page: this.num
					})
					if(flag){
						this.criticList = res.data.data.rows
					}else{
						this.criticList = this.criticList.concat(res.data.data.rows)
					}
					this.count = res.data.data.count
				} catch (e) {
					//TODO handle the exception
				}
			},
			//上拉加载
			toLoad() {
				if (this.criticList.length > this.count) return
				this.num += 1
				this.handelCritic(false)
			},
		}
	}
</script>

<style lang="scss">
	page,
	.detail {
		height: 100%;
		background-color: #f5f5f3;
	
	.top {
			padding-bottom: 20rpx;
			background-color: #fff;
		}

		.con {
			margin-top: 20rpx;
			background-color: #fff;
			padding-bottom: 100rpx;

			button {
				width: 95%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
			}
		}

		.footer {
			width: 100%;
			background-color: #fff;
			padding: 15rpx 25rpx;
			position: fixed;
			bottom: 0;
			border-top: 1rpx solid #eee;
			display: flex;
			align-items: center;

			input {
				flex: 5;
				height: 70rpx;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				background-color: #f8f9fa;
				padding: 20rpx;
			}

			.active {
				color: #dc3557;
			}

			.icon {
				flex: 1;
				display: flex;
				align-items: center;
				margin-left: 25rpx;

				.s {
					font-size: 45rpx;
					margin-right: 10rpx;
				}
			}
		}

		.popup-content {
			width: 100%;
			height: 350rpx;
			.top{
				width: 100%;
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				button{
					background-color: #66afff;
					color: #c2dfff;
					margin-left: 520rpx;
				}
				.btnActive{
					background-color: #007aff;
					color: #fff;
				}
			}
			textarea{
				padding: 20rpx;
			}
		}
	}
</style>
