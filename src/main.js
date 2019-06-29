import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './static/css/style.css'   //修改公用全局樣式

Vue.use(iView);
Vue.use(VueRouter); 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
