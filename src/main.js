// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'

import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'

import store from './vuex/store.js'

import App from './App.vue'
import { router, setRoutes } from './router'

import { checkPermission } from "./common/util"

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.checkPermission = checkPermission;

/* eslint-disable no-new */
let VUE = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

setRoutes()

export default VUE;
