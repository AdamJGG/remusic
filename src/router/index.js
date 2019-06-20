//导入vue
import Vue from 'vue'

//导入vue-router
import Router from 'vue-router'

//导入路由配置
import routes from './routes.js'

//使用router
Vue.use(Router)

export default new Router({
	routes
})