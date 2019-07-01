import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import Thank from '@/components/Thank.vue'

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
      {
        path: 'thank',
        name: "Thank",
        component: Thank
      }
    ]
  }
  ]
})

export default router;
