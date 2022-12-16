<template>
	<view class="content">
		<view class="item" v-for="(item,index) in bbsList" :key="index">
			<view class="userInfo" @click="bbsDetails(item)">
				<view class="left">
					<view class="image">
						<image :src="item.user.avatar || ''" mode=""></image>
					</view>
					<view class="name_sex">
						<view class="name">
							{{item.user.name}}
						</view>
						<view class="sex">
							{{item.user.sex}}
						</view>
					</view>
				</view>
				<view class="essence" v-if="item.is_top">
					精华
				</view>
			</view>

			<view class="conent"  @click="bbsDetails(item)">
				<view class="conent_text" v-if="item.desc.text">
					{{item.desc.text}}
				</view>
				<block v-if="item.desc.images">
					<view class="conent_image">
						<view class="images" v-for="(ele,i) in item.desc.images" :key="i">
							<image :src="ele" mode=""></image>
						</view>
					</view>
				</block>
			</view>
			
			<view class="footer" v-if="!footerFlag">
				<view class="left">
					<text class="iconfont icon-pinglun2 icon"></text>
					<text>{{item.comment_count}}</text>
					<text class="iconfont icon-dianzan2 icon" :class="{corActive:item.issupport}" @click.stop="give(item)"></text>
					<text @click.stop="give(item)" :class="{corActive:item.issupport}">{{item.support_count}}</text>
				</view>
				<view class="right">
					{{item.created_time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "bbsContent",
		props: {
			bbsList: {
				type: Array,
				default: () => []
			},
			footerFlag:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			give(item){
				console.log(item);
				this.$emit('give',item)
			},
			bbsDetails(item){
				console.log(item.id);
				this.navTo('/pages/post-detail/post-detail?id='+item.id)
			},
		},
	}
</script>

<style lang="scss">
	.content {

		.item {
			background-color: #fff;
			margin-bottom: 10rpx;
			padding: 30rpx 20rpx;

			.userInfo {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						background-color: #f8f9fa;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.name_sex {
						margin-left: 30rpx;

						.name {
							color: #1e7dff;
							font-weight: 700;
						}

						.sex {
							font-size: 31rpx;
							color: #6c7682;
						}
					}
				}

				.essence {
					padding: 10rpx 20rpx;
					color: #fff;
					background-color: #ffca3b;
					font-size: 26rpx;
					
				}
			}
			.conent{
				padding: 0 10rpx;
				.conent_text{
					margin-top: 20rpx;
				}
				.conent_image{
					display: flex;
					flex-wrap: wrap;
					
					.images{
						margin-right: 10rpx;
						margin-top: 10rpx;
						width: 220rpx;
						height: 220rpx;
						border-radius: 15rpx;
						
						image{
							width: 100%;
							height: 100%;
							border-radius: 15rpx;
						}
					}
				}
			}
			
			.footer{
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					margin-left: 15rpx;
					.icon{
						font-size: 42rpx;
					}
					text{
						padding: 0 6rpx;
					}
					.corActive{
						color: #de3545;
					}
				}
				.right{
					color: #888;
					font-size: 26rpx;
				}
			}


		}
	}
</style>
