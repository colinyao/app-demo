// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './index.vue'
import FastClick from 'fastclick'
import router from './route.js'
import store from './store'
import '~a/css/common.less'
import 'intersection-observer';  //IntersectionObserver polyfill
IntersectionObserver.prototype.POLL_INTERVAL = 100;
FastClick.attach(document.body);

Vue.config.productionTip = false
import '../../mock/index.js'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Index/>',
  components: { Index }
})
