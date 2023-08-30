import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store';
import router from "@/router";
import VueWechatTitle from 'vue-wechat-title';
import CodeView from "vue-code-view";

import mapBoxGl from 'mapbox-gl'
Vue.prototype.$mapboxgl = mapBoxGl


Vue.use(CodeView);
//动态标题
Vue.use(VueWechatTitle)
Vue.config.productionTip = false

Vue.use(ElementUI);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
