export default () => {
	return [
		[
			{
					icon: 'iconfont icon-9',
					title: '我的优惠劵',
					rightIcon:"iconfont icon-right",
					page: '/pages/my-coupon/my-coupon',
					login: false, 
				},
				{
					icon: 'iconfont icon-help',
					title: '常见问题',
					rightIcon:"iconfont icon-right"
					// page: '/pages/order/order', 
					// login: true, 
				},
				{
					icon: 'iconfont icon-leimupinleifenleileibie',
					title: '设置',
					rightIcon:"iconfont icon-right",
					page: '/pages/setting/setting', 
					login: true, 
				}
		]
	]
}
