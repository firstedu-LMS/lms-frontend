import { createRouter, createWebHistory } from "vue-router";
import HP_Page from "../pages/public/HP_Page.vue";
import HC_Page from "../pages/public/HC_Page.vue";
import HJ_Page from "../pages/public/HJ_Page.vue";
import HJD_Page from "../pages/public/HJD_Page.vue";

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
    path: "/careers",
    name: "HJ_Page",
    component: HJ_Page
  },
  {
    path: "/careers/:id",
    name: "HJD_Page",
    component: HJD_Page
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
