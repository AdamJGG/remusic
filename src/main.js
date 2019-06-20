import 'lib-flexible/flexible.js'
import './iconfont/iconfont.css'
import axios from 'axios'
	
import 'jquery'

import Vue from 'vue'
import App from './App.vue'
//import Vuelazyload from 'vue-lazyload'
//Vue.use(Vuelazyload)
//导入vant ui库
// import Vant from 'vant'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

import Vuelazyload from 'vue-lazyload'
	Vue.use(Vuelazyload,{
		loading:require('./assets/logo.png')
	})
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);
import { Icon } from 'vant';

Vue.use(Icon);
import { NavBar ,Search } from 'vant';

Vue.use(NavBar).use(Search);

import { Row,Col } from 'vant'
Vue.use(Row).use(Col)

import { Loading } from 'vant';
Vue.use(Loading);
//导入路由
import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')