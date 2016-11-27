import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import TestView from '../views/TestView.vue'
import EchartsView from '../views/EchartsView.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/test/:page(\\d+)?', component: TestView },
    { path: '/echarts/:page(\\d+)?', component: EchartsView },
    { path: '/', redirect: '/test' }
  ]
})
