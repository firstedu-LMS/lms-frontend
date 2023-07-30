import { createRouter, createWebHistory } from "vue-router";

import HP_Page from "../pages/public/HP_Page.vue";
import HC_Page from "../pages/public/HC_Page.vue";
import HJ_Page from "../pages/public/HJ_Page.vue";
import HJD_Page from "../pages/public/HJD_Page.vue";
import HCD_Page from "../pages/public/HCD_Page.vue";

import AdminDashboardLayout from '../layouts/admin/AdminDashboardLayout.vue'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.vue'

const routes = [
  {
    path: "/",
    name: "HP_Page",
    component: HP_Page
  },

  {
    path: "/courses",
    name: "HC_Page",
    component: HC_Page
  },
  {
    path: "/courses/:id",
    name: "HCD_Page",
    component: HCD_Page
  },
  {
    path: "/careers",
    name: "HJ_Page",
    component: HJ_Page
  },
  {
    path: "/careers/:id",
    name: "HJD_Page",
    component: HJD_Page
  },

  {
    path : '/admin',
    name : 'AdminDashboardLayout',
    component : AdminDashboardLayout,
    children : [
      {
        path : '',
        name : 'AdminDashboardPage',
        component : AdminDashboardPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
