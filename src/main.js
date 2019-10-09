import Vue from 'vue'
import App from './App.vue'
import VueRouter from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import axios from 'axios';

Vue.config.productionTip = false
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = "d8eecaac5959d18c132c8df4ba1f50cb";
axios.defaults.headers.get['Accept'] = 'application/json';
new Vue({
  router: VueRouter,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
