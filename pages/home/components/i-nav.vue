<template>
	<view class="nav">
		<view class="navitem" v-for="(item,index) in homeNavList" :key="index" @click="navAuth(item)"
			hover-class="active">
			<view class="images">
				<image :src="item.src" mode=""></image>
			</view>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Inav",
		props: {
			homeNavList: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			navAuth(item) {
				if (item.url) {
					this.navTo("/pages/webview/webview?url=" + item.url)
				} else {
					console.log(item);
					switch (item.module) {
						case "test":
							this.navTo('/pages/test-list/test-list')
							break;
						case "book":
							this.navTo('/pages/book-list/book-list')
							break;
						case "bbs":
							this.navTo('/pages/bbs/bbs')
							break;
						default:
							this.navTo('/pages/list/list?module=' + item.module)
							break;
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.active {
		background-color: rgba(0, 0, 0, .03);
	}

	.nav {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-top: 25rpx;

		.navitem {
			flex: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 10rpx 0;

			.images {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			text {
				font-size: 26rpx;
				color: #6c757d;
				margin-top: 10rpx;
			}
		}
	}
</style>
