import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'

Vue.use(Router)
let router = new Router({
  linkActiveClass: 'is-active',
  routes: [{
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ShoppingCart',
        component: ShoppingCart
      },
    ]
  }
  ]
})

export default router;
