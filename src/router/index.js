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
import AdminWeekPage from "@/pages/admin/AdminWeekPage.vue"
import AdminAssignmentPage from '@/pages/admin/AdminAssignmentPage.vue'
import AdminLessonPage from "@/pages/admin/AdminLessonPage.vue"
import AdminEnrollmentPage from "@/pages/admin/AdminEnrollmentPage.vue"

import StudentDashboardLayout from '@/layouts/student/StudentDashboardLayout.vue'
import StudentProfilePage from "@/pages/student/StudentProfilePage.vue";
import StudentCoursePage from "@/pages/student/StudentCoursePage.vue"
import StudentCourseDetailPage from "@/pages/student/StudentCourseDetailPage.vue"
import StudentLessonDetailPage from "@/pages/student/StudentLessonDetailPage.vue"
import StudentAssignmentsPage from '@/pages/student/StudentAssignmentsPage'

import StudentAssignmentPage from '@/pages/student/StudentAssignmentPage';

import TokenService from "@/services/TokenService";

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
    meta : {
      middleware : "admin"
    },
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
        path : 'enrollments',
        name : 'AdminEnrollmentPage',
        component : AdminEnrollmentPage
      },
      {
        path : 'courses/:course_id/batches',
        name : 'AdminBatchPage',
        component : AdminBatchPage
      },
      {
        path : 'courses/:course_id/batches/:batch_id/weeks',
        name : 'AdminWeekPage',
        component : AdminWeekPage
      },
      {
        path : 'courses/:course_id/batches/:batch_id/assignments',
        name : 'AdminAssignmentPage',
        component : AdminAssignmentPage
      },
      {
        path : 'courses/:course_id/batches/:batch_id/weeks/:week_id/lessons',
        name : 'AdminLessonPage',
        component : AdminLessonPage
      },
    ]
  },


  //student
  {
    path : '/student',
    name : 'StudentDashboardLayout',
    component : StudentDashboardLayout,
    meta : {
      middleware : 'student'
    },
    children : [
      {
        path : '',
        name : 'StudentProfilePage',
        component : StudentProfilePage
      },
      {
        path : 'courses',
        name : 'StudentCoursePage',
        component : StudentCoursePage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id',
        name : 'StudentCourseDetailPage',
        component : StudentCourseDetailPage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id/:week_id',
        name : 'StudentLessonDetailPage',
        component : StudentLessonDetailPage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id/assignments',
        name : 'StudentAssignmentPage',
        component : StudentAssignmentPage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id/assignments/:id',
        name : 'StudentAssignmentsPage',
        component : StudentAssignmentsPage
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
    let token = TokenService.getToken();
    if (token) {
          await authStore.getUser();
            if (authStore.authenticated) {
              let isAuthenticatedByRole = authStore.roles.find((role) => role.name == to.meta.middleware);
              isAuthenticatedByRole ? next() : next('/login');
            } else {
              next('/login')
            }
    } else {
        authStore.destroyAuth();
        next('/login');
    }
  } else {
    next();
  }
})

export default router
