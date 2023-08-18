import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HP_Page from "@/pages/public/HP_Page.vue";
import HC_Page from "@/pages/public/HC_Page.vue";
import HJ_Page from "@/pages/public/HJ_Page.vue";
import HJD_Page from "@/pages/public/HJD_Page.vue";
import HCD_Page from "@/pages/public/HCD_Page.vue"

import RegisterPage from "@/pages/public/RegisterPage.vue"
import LoginPage from "@/pages/public/LoginPage.vue"


import AdminDashboardLayout from '@/layouts/admin/AdminDashboardLayout.vue'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage.vue'

import AdminApplicationPage from '@/pages/admin/AdminApplicationPage.vue'
import AdminInstructorPage from '@/pages/admin/AdminInstructorPage.vue'
import AdminCareerPage from "@/pages/admin/AdminCareerPage.vue"
import AdminCoursePage from "@/pages/admin/AdminCoursePage.vue"
import AdminBatchPage from '@/pages/admin/AdminBatchPage.vue'
import AdminWeekPage from "@/pages/admin/AdminWeekPage.vue";
import AdminLessonPage from "@/pages/admin/AdminLessonPage.vue"


const routes = [
  {
    path: "/",
    name: "HP_Page",
    component: HP_Page
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
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
    // meta : {
    //   middleware : "admin"
    // },
    children : [
      {
        path : '',
        name : 'AdminDashboardPage',
        component : AdminDashboardPage
      },
      {
        path : 'applications',
        name : 'AdminApplicationPage',
        component : AdminApplicationPage
      },
      {
        path : 'instructors',
        name : 'AdminInstructorPage',
        component : AdminInstructorPage
      },
      {
        path : 'careers',
        name : 'AdminCareerPage',
        component : AdminCareerPage
      },
      {
        path : 'courses',
        name : 'AdminCoursePage',
        component : AdminCoursePage
      },
      {
        path : 'courses/:id/batches',
        name : 'AdminBatchPage',
        component : AdminBatchPage
      },
      {
        path : 'batches/:id/weeks',
        name : 'AdminWeekPage',
        component : AdminWeekPage
      },
      {
        path : 'weeks/:id/lessons',
        name : 'AdminLessonPage',
        component : AdminLessonPage
      },

    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to , from , next) => {
  let authStore = useAuthStore()
  if(to.meta.middleware){
    authStore.verifyAuth(to.meta.middleware);
    if (authStore.user) {
      next();
    } else {
      alert("Error! Please loggin again")
    }
  } else {
    next();
  }
})

export default router
