import { createRouter, createWebHistory } from 'vue-router'

import HP_Page from '../pages/public/HP_Page.vue'

const routes = [
  {
    path : '/',
    name : 'HP_Page',
    component : HP_Page
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
