import Vue from 'vue'
import Router from 'vue-router'
import ebook from '@/components/Ebook'
Vue.use(Router)

export default new Router({
  base: '/myreader/',
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: ebook
    }
  ]
})
