import Vue from 'vue'
import Yuer from './yuer.vue'
import index from './views/index.vue'
import lives from './views/lives.vue'
import videos from './views/videos.vue'
import search from './views/search.vue'
import searchresult from './views/searchresult.vue'

import VueRouter from 'vue-router' 
import VueResource from 'vue-resource' 
//注册两个插件 
Vue.use(VueResource) 
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/lives',
      component: lives
    },
    {
      path: '/videos',
      component: videos
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/searchresult',
      component: searchresult
    }
  ]
})

const app = new Vue({
    router: router,
    render: h => h(Yuer)
}).$mount('#app')