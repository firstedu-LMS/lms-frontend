import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../pages/public/layout/PublicView.vue'
import HP_Page from '../pages/public/HP_Page.vue'
import HC_Page from '../pages/public/HC_Page.vue'
import HJ_Page from '../pages/public/HJ_Page.vue'
import HCD_Page from '../pages/public/HCD_Page.vue'
const routes = [
  
  {
    path : '/',
    name : 'HP_Page',
    component : HP_Page
  },
  {
    path : '/',
    name : 'PublicView',
    component : PublicView,
    children : [
      {
        path : 'courses',
        name : 'HC_Page',
        component : HC_Page
      },
      {
        path : 'careers',
        name : 'HJ_Page',
        component : HJ_Page
      },
      {
        path : 'applications',
        name : 'HCD_Page',
        component : HCD_Page
      },

    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
