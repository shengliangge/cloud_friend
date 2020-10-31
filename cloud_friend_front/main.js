import Vue from 'vue'
import App from './App'
import API from './utils/api.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$api = API
const app = new Vue({
	...App
})
app.$mount()
