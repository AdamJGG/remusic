// 导入文件时, 如果没有 ./, 默认从node_modules查找文件
import routesComponent from './routesComponent.js'

//路由配置
export default [{
		path: '/',
		name: 'Login',
		component: routesComponent.Login
	},
	{
		path: '/register',
		name: 'Register',
		component: routesComponent.Register
	},
	{
		path: '/test',
		name: 'Test',
		component: routesComponent.Test,
		children: [{
				path: '/find',
				name: 'Find',
				component: routesComponent.Find,
				children: [{
					path: '/frist',
					name: 'Frist',
					component: routesComponent.Frist
				}]
			},
			{
				path: '/video',
				name: 'Video',
				component: routesComponent.Video
			},
			{
				path: '/mine',
				name: 'Mine',
				component: routesComponent.Mine,

			},
			{
				path: '/accounts',
				name: 'Accounts',
				component: routesComponent.Accounts,
				children: [{
					path: '/message',
					name: 'Message',
					component: routesComponent.Message
				}]
			},
			{
				path: '/music',
				name: 'Music',
				component: routesComponent.Music,
				children: [{
						path: '/like',
						name: 'Like',
						component: routesComponent.Like
					},
					{
						path: '/second',
						name: 'Second',
						component: routesComponent.Second
					},

					{
						path: '/songlist/:pid',
						name: 'Songlist',
						component: routesComponent.Songlist
					}, ,
					{
						path: '/play/:pid',
						name: 'Play',
						component: routesComponent.Play
					}

				]
			},
			{
				path: '/local',
				name: 'Local',
				component: routesComponent.Local
			},
			{
				path: '/recent',
				name: 'Recent',
				component: routesComponent.Recent
			},
			{
				path: '/collect',
				name: 'Collect',
				component: routesComponent.Collect
			}

		]
	},
	{
		path: '/playmusic/:pid',
		name: 'Playmusic',
		component: routesComponent.Playmusic
	},
	{
		path: '/scroll',
		name: 'Scroll',
		component: routesComponent.Scroll
	}

]