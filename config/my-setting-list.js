export default () => {
	return [
		[
			{
					title: '账号安全',
					rightIcon:"iconfont icon-right",
					page: '/pages/user-safe/user-safe',
					login: false, 
				},
				{
					title: '清除缓存',
					rightText:'2.00KB',
					event:'clearCache',
				},
				{
					title: '检查更新',
					rightIcon:"iconfont icon-right",
				},
				{
					title: '当前版本',
					rightText:'1.00',
				}
		]
	]
}