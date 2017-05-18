import Vue from 'vue'
import Yuer from './yuer.vue'
import index from './views/index.vue'
import lives from './views/lives.vue'
import liveArea from './views/liveArea.vue'
import collect from './views/collect.vue'
import news from './views/news.vue'
import videos from './views/videos.vue'
import videoArea from './views/videoArea.vue'
import search from './views/search.vue'
import searchresult from './views/searchresult.vue'
import liveDetail from './views/liveDetail.vue'
import videoDetail from './views/videoDetail.vue'

import VueRouter from 'vue-router' 
import VueResource from 'vue-resource' 
//注册两个插件 
Vue.use(VueResource) 
Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path: '/lives',
      component: lives
    },
    {
      path: '/collect',
      component: collect
    },
    {
      path: '/news',
      component: news
    },
    {
      path: '/videos',
      component: videos
    },
    {
      path: '/videoArea',
      component: videos
    },
    {
      path: '/liveArea',
      component: videos
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/searchresult',
      component: searchresult
    },
    {
      path: '/liveDetail',
      component: liveDetail
    },
    {
      path: '/videoDetail',
      component: videoDetail
    },
    { path: '*', redirect: '/index'}
  ]
})

const app = new Vue({
    router: router,
    render: h => h(Yuer)
}).$mount('#app')