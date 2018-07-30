// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import axios from 'axios'
import Qs from 'qs'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/const/axiosld'

Vue.use(ElementUI);
Vue.config.productionTip = false

axios.interceptors.request.use((config) => {
	if(config.method == "post") {
		config.data = Qs.stringify(config.data);
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	if(config.showLoading !== false) {
		showFullScreenLoading()
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
	if(response.data.code == 401) {
		router.push('/login');
	}
	if(response.config.showLoading !== false) {
		tryHideFullScreenLoading()
	}
	return response
}, (error) => {
	return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})