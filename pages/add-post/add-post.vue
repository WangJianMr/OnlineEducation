<template>
	<view class="add_post">
		<!-- 选择社区 -->

		<view class="selectCommunity">
			<picker :value="community" :range="bbsTopList" range-key="title" @change="selectComm">
				<view class="community">
					{{title || bbsTopList[index]}}
				</view>
			</picker>

		</view>
		<!-- textarea -->
		<view class="textarea" v-for="(ele,i) in sum" :key="i">
			<view class="remove" v-if="i>0" @click="remove(i)">
				移除
			</view>
			<textarea class="textareaInput" v-model="ele.text" placeholder="请填写帖子内容"></textarea>
			<view class="flex justify-between">
				<text>点击可预览选好的图片</text>
				<text class="cor">{{ele.images.length}}/9</text>
			</view>
			<view class="imagBox">
				<view v-if="ele.images.length>0" class="images" v-for="(item,index) in ele.images" :key="index">
					<image :src="item" mode=""></image>
				</view>

				<view class="selectImage" @click="selectImage(i)">
				</view>
			</view>
		</view>



		<!-- //添加按钮 -->
		<view class="btns">
			<button @click="addConent">添加内容</button>
		</view>

	</view>
</template>

<script>
	import UploadApi from "@/api/upload.js"
	import bbsApi from "@/api/bbs.js"
	export default {
		data() {
			return {
				community: 0,
				title: "选择地区",
				bbs_id: null,
				bbsTopList: [],
				sum: [{
					images: [],
					text: "",
				}],
			};
		},
		onLoad() {
			this.handelBbsTopList()
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				if (!this.bbs_id) {
					this.$utils.msg('请选择地区')
					return
				}
				let obj = {
					bbs_id: this.bbs_id,
					content: this.sum
				}
				this.handelPublisApi(obj)
			}
		},
		methods: {
			//移除
			remove(i) {
				uni.showModal({
					content:"确定移除当前内容吗",
					success: (res) => {
						if(res.confirm){
							this.sum.splice(i,1)
						}
					}
				})
				
			},
			addConent() {
				this.sum.push({
					images: [],
					text: "",
				})
			},
			//选择地区
			selectComm(e) {
				this.bbs_id = this.bbsTopList[e.detail.value].id
				this.title = this.bbsTopList[e.detail.value].title
			},
			//发布帖子api
			async handelPublisApi(obj) {
				try {
					const res = await bbsApi.getBbsPublishCap(obj)
					if (res.statusCode === 200) {
						this.sum.forEach(item=>{
							item.images=[]
							item.text = ""
						})
						this.bbs_id = null
						this.title = "选择地区"
						this.$utils.msg('发布成功')
					}
				} catch (e) {
					//TODO handle the exception
				}
			},

			//选择图片
			selectImage(i) {
				console.log(i);
				if (this.sum[i].images.length >= 9) {
					this.$utils.msg('最多上传9张')
					return
				}
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// this.imag = res.tempFilePaths[0]
						// console.log(res);
						this.handelUpImage(res.tempFilePaths[0],i)

					}
				});
			},
			//上传图片接口
			async handelUpImage(file,i) {
				try {
					const res = await UploadApi.uploadImg(file)
					if (res.statusCode === 200) {
						this.sum[i].images.push(JSON.parse(res.data).data)
						this.$utils.msg('上传成功')
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			//获取顶部数据
			async handelBbsTopList() {
				try {
					const res = await bbsApi.getBbsTopList({
						page: 1,
						limit: 100
					})
					this.bbsTopList = res.data.data.rows
					this.topCount = res.data.data.count
					console.log(this.bbsTopList);

				} catch (e) {
					//TODO handle the exception
				}
			},
		}
	}
</script>

<style lang="scss">
	.add_post {
		.selectCommunity {
			padding: 30rpx 20rpx;
			border-bottom: 1rpx solid #eee;

			.community {
				line-height: 60rpx;
				width: 100%;
				background-color: #f8f8f8;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				text-align: center;
				font-size: 26rpx;
			}
		}


		.textarea {
			padding: 30rpx 20rpx;
			border-bottom: 1rpx solid #eee;

			.remove {
				text-align: right;
				font-size: 24rpx;
				margin-bottom: 20rpx;
				color: #888;
			}

			.textareaInput {
				width: 100%;
				height: 300rpx;
				background-color: #f8f9fa;
				padding: 20rpx;
			}

			.cor {
				color: #888;
			}

			.imagBox {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-bottom: 80rpx;

				.images {
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					width: 217rpx;
					height: 208rpx;
					border: 1rpx solid #eee;
					border-radius: 10rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.selectImage {
					width: 217rpx;
					height: 208rpx;
					border: 1rpx solid #eee;
					border-radius: 10rpx;
					position: relative;
					margin-bottom: 20rpx;

					&::after {
						content: "";
						display: inline-block;
						width: 100rpx;
						height: 4rpx;
						background-color: #d9d9d9;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}

					&::before {
						content: "";
						display: inline-block;
						width: 100rpx;
						height: 4rpx;
						background-color: #d9d9d9;
						position: absolute;
						top: 50%;
						left: 25%;
						transform: rotate(90deg);
					}
				}
			}
		}

		.btns {
			position: fixed;
			bottom: 10rpx;
			width: 100%;
			z-index: 99999;

			button {
				background-color: #5ccc84;
				color: #fff;
				font-size: 34rpx;
				padding-top: 5rpx;
			}
		}
	}
</style>
