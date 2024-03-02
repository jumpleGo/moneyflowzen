import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('./../views/Main.vue')
    },
    {
      path: '/test',
      component: () => import('./../views/Test.vue')
    },
    {
      path: '/gift',
      component: () => import('./../views/Gift.vue')
    },
    {
      path: '/products',
      component: () => import('./../components/ListProducts.vue')
    },
    {
      path: '/baza',
      component: () => import('./../components/DetailInfo.vue')
    },
    {
      path: '/start_to_trading',
      component: () => import('./../components/DetailInfo.vue')
    },
    {
      path: '/crypto',
      component: () => import('./../components/DetailInfo.vue')
    },
    {
      path: '/practicum',
      component: () => import('./../components/DetailInfo.vue')
    },
    {
      path: '/introday',
      component: () => import('./../components/DetailInfo.vue')
    },
    {
      path: '/cryptodeep',
      component: () => import('./../components/DetailInfo.vue')
    }
  ]
})

export default router
