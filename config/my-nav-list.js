export default () => {
	return [{
			icon: 'iconfont icon-OrderHistory',
			title: '订单',
			page: '/pages/order-list/order-list', 
			login: false, 
		},
		{
			icon: 'iconfont icon-pinglun2',
			title: '消息',
			page: '/pages/msg-list/msg-list', 
			login: false, 
		},
		{
			icon: 'iconfont icon-shoucang1',
			title: '收藏',
			page: '/pages/fava-list/fava-list', 
			login: false, 
		},
		{
			icon: 'iconfont icon-e-learning-monitor',
			title: '在学',
			page: '/pages/tabbar/learn/learn', 
			login: true,
			bar:true,
		}
	]
}
