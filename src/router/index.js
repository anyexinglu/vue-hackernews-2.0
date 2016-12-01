import Vue from 'vue'
import Router from 'vue-router'
// import Element from 'element-ui'

Vue.use(Router)
// Vue.use(Element)

import TestView from '../views/TestView.vue'
import EchartsView from '../views/EchartsView.vue'
import TryView from '../views/TryView.vue'
import Home from '../views/Home.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/test/:page(\\d+)?', component: TestView },
    { path: '/try', component: TryView },
    { path: '/echarts/:page(\\d+)?', component: EchartsView },
    { path: '/', component: Home }
  ]
})
