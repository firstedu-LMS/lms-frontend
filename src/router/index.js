import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../pages/public/layout/PublicView.vue'
import HP_Page from '../pages/public/HP_Page.vue'
import HC_Page from '../pages/public/HC_Page.vue'
import HJD_Page from '../pages/public/HJD_Page.vue'
import HJD01 from '../components/public/HJD_Page/HJD01.vue'
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
        name : 'HJD_Page',
        component : HJD_Page
      },

    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
