<template>
	<view class="exam">
		<view class="top">
			<view class="title-time">
				<h4 class="title">
					{{item.title}}
				</h4>
				<view class="time">
					时长: {{item.expire}}分钟
				</view>
			</view>
			<view class="rule">
				<text>题目总数: {{item.question_count}}</text>
				<text>总分数: {{item.total_score}}</text>
				<text>及格分: {{item.pass_score}}</text>
			</view>
		</view>
		<view class="footer">
			<view class="btn" :class="{active:!item.is_test}" @click.stop="join(item)">
				{{item.is_test?'你考过了':'参加考试'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "exam",
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			join(item) {
				console.log(item);
				if (item.is_test) return
				uni.showModal({
					content: '是否要开始考试',
					success: (res)=> {
						if (res.confirm) {
							this.navTo('/pages/test-detail/test-detail?id='+item.id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.exam {
		background-color: #fff;
		margin-bottom: 15rpx;
		overflow: hidden;

		.top {
			padding: 20rpx;
			border-top: 1rpx solid #eee;
			border-bottom: 1rpx solid #eee;

			.title-time {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.time {
					font-size: 24rpx;
					color: #dc3545;
				}
			}

			.rule {
				padding: 30rpx 20rpx 30rpx;

				text {
					padding-right: 55rpx;
				}
			}
		}

		.footer {
			padding: 20rpx;
			float: right;

			.btn {
				background-color: #7be09f;
				color: #fff;
				padding: 20rpx;
				border-radius: 15rpx;
				max-width: 170rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.active {
				background-color: #5ccc84 !important;
			}
		}
	}
</style>
