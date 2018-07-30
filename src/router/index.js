import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
const constantRouterMap = [{
		path: '/',
		redirect: '/home/',
		component: _import('index'),
		children: [
			{
				path: '/home/',
				component:_import('home/home'),
			},
			{
				path: '/school_info/',
				redirect: '/school_info/basicsInfo',
				component:_import('school_info/school_info'),
				children:[
					{
						path: '/school_info/basicsInfo',
						component:_import('school_info/innerPage/basicsInfo'),
					},
					{
						path: '/school_info/batchOperation',
						component:_import('school_info/innerPage/batchOperation'),
					},
					{
						path: '/school_info/cardCenter',
						component:_import('school_info/innerPage/cardCenter'),
					},
					{
						path: '/school_info/classManagement',
						component:_import('school_info/innerPage/classManagement'),
					},
					{
						path: '/school_info/classManagement/classDetails/:id',
						component:_import('school_info/innerPage/classDetails'),
					},
					{
						path: '/school_info/classManagement/modifythe/:id',
						component:_import('school_info/innerPage/modifythe'),
					},
					{
						path: '/school_info/classManagement/addTeacher',
						component:_import('school_info/innerPage/addTeacher'),
					},
					{
						path: '/school_info/classManagement/parentList',
						component:_import('school_info/innerPage/parentList'),
					},
					{
						path: '/school_info/organization',
						component:_import('school_info/innerPage/organization'),
					},
					{
						path: '/school_info/placeDefinition',
						component:_import('school_info/innerPage/placeDefinition'),
					},
					{
						path: '/school_info/timeTable',
						component:_import('school_info/innerPage/timeTable'),
					}
				]
			},
			{
				path: '/application/',
				component:_import('application/application'),
			},
			{
				path: '/dataStatistics/',
				component:_import('dataStatistics/dataStatistics'),
			},
			{
				path: '/systemSettings/',
				component:_import('systemSettings/systemSettings'),
			},
			{
				path: '/systemSettings/help-center',
				component:_import('systemSettings/help-center'),
			},
			{
				path: '/systemSettings/msgList',
				component:_import('systemSettings/msgList'),
			},
			{
				path: '/systemSettings/msgDetail/:id',
				component:_import('systemSettings/msgDetail'),
			},
		]
	},
	{
		path: '/login',
		component: _import('login')
	}
]
export default new Router({
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})