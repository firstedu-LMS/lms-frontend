import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HP_Page from "@/pages/public/HP_Page.vue";
import HC_Page from "@/pages/public/HC_Page.vue";
import HJ_Page from "@/pages/public/HJ_Page.vue";
import HJD_Page from "@/pages/public/HJD_Page.vue";
import HCD_Page from "@/pages/public/HCD_Page.vue"

import RegisterPage from "@/pages/public/RegisterPage.vue"
import LoginPage from "@/pages/public/LoginPage.vue"

import StudentDashboardLayout from '@/layouts/student/StudentDashboardLayout.vue'
import StudentProfilePage from "@/pages/student/StudentProfilePage.vue";
import StudentCoursePage from "@/pages/student/StudentCoursePage.vue"
import StudentCourseDetailPage from "@/pages/student/StudentCourseDetailPage.vue"
import StudentLessonDetailPage from "@/pages/student/StudentLessonDetailPage.vue"

import StudentAssignmentsPage from '@/pages/student/StudentAssignmentsPage.vue'
import StudentAssignmentPage from '@/pages/student/StudentAssignmentPage.vue';
import StudentAssignmentScoresPage from '@/pages/student/StudentAssignmentScoresPage.vue'


//instructors
import InstructorDashboardLayout from '@/layouts/instructor/InstructorDashboardLayout.vue'
import InstructorProfilePage from '@/pages/instructor/InstructorProfilePage.vue'
import InstructorCoursePage from '@/pages/instructor/InstructorCoursePage.vue'
import InstructorSettingsPage from "@/pages/instructor/InstructorSettingsPage.vue";
import InstructorWeekPage from '@/pages/instructor/InstructorWeekPage.vue'
import InstructorLessonsPage from '@/pages/instructor/InstructorLessonsPage.vue'
import InstructorLessonPage from "@/pages/instructor/InstructorLessonPage.vue";
import CreateLessonPage from '@/pages/instructor/CreateLessonPage.vue'

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
        path : ':course_id/assignments-scores',
        name : 'StudentAssignmentScoresPage',
        component : StudentAssignmentScoresPage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id/:week_id',
        name : 'StudentLessonDetailPage',
        component : StudentLessonDetailPage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id/assignments',
        name : 'StudentAssignmentsPage',
        component : StudentAssignmentsPage
      },
      {
        path : 'courses/:student_id/:course_id/:batch_id/assignments/:id',
        name : 'StudentAssignmentPage',
        component : StudentAssignmentPage
      },
    ]
  },

  //instructors
  {
    path : '/instructor',
    name : 'InstructorDashboardLayout',
    component : InstructorDashboardLayout,
    meta : {
      middleware : 'instructor'
    },
    children : [
      {
        path : '',
        name : 'InstructorProfilePage',
        component : InstructorProfilePage
      },
      {
        path : 'courses',
        name : 'InstructorCoursePage',
        component : InstructorCoursePage
      },
      {
        path : 'courses/:course_id/:batch_id/weeks',
        name : 'InstructorWeekPage',
        component : InstructorWeekPage
      },
      {
        path : 'courses/:course_id/:batch_id/:week_id/lessons',
        name : 'InstructorLessonsPage',
        component : InstructorLessonsPage
      },
      {
        path : 'courses/:course_id/:batch_id/:week_id/lessons/:id',
        name : 'InstructorLessonPage',
        component : InstructorLessonPage
      },
      {
        path : 'courses/:course_id/:batch_id/:week_id/lessons/create',
        name : 'CreateLessonPage',
        component : CreateLessonPage
      },
      {
        path : 'settings',
        name : 'InstructorSettingsPage',
        component : InstructorSettingsPage
      }
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
