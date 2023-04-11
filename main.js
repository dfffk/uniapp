import App from './App'
import Vue from 'vue'
// main.js
import uView from '@/uni_modules/uview-ui'
import api from './apis/index.js'
import store from './store'
Vue.prototype.$store = store
Vue.use(uView)
Vue.config.productionTip = false
//将api全局挂载，后续在组件中可以通过this.$api 获取到api对象
Vue.prototype.$api = api
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
