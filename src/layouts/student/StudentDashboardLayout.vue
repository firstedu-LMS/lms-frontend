<template>
  <div class="flex bg-gray-3">
    <aside class="sticky top-0 hidden w-1/6 h-screen sm:block">
      <router-link class="block" to="/">
          <img class="w-24 mx-auto my-2" src="../../../public/images/layout/logo.png" alt="">
        </router-link>
      <ul class="mt-8">
        <li class="p-2 m-4" v-for="item in sideItems" :key="item.name">
          <router-link :to="{name : item.path}" class="flex items-center hover:text-blue-2">
            <span style="margin-right: 7px;margin-top: -4px;" class="material-icons-outlined">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </li>
        <li class="p-2 font-bold text-center border-t border-gray-2 text-red">
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </aside>
    <div class="w-full sm:w-5/6">
      <nav class="sticky top-0 z-50 flex justify-between px-4 py-1 sm:justify-end">
        <button class="sm:hidden">
          <span style="margin: auto 0px;" class="material-icons-sharp">notifications</span>
        </button>
        <span style="margin: auto 0px;" class="material-icons-sharp">notifications</span>
      </nav>
      <main class="z-10 mx-4 mt-4 bg-white rounded-2xl">
        <router-view></router-view>
      </main>
    </div>

  </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { useAuthStore } from '@/stores/auth';
export default {
  data() {
    return {
      btn: true,
      sideBar: false,
      authStore : useAuthStore(),
      sideItems: [
        {
          name: "Profile",
          path: "StudentProfilePage",
          icon : 'person_outline'
        },
        {
          name: "Courses",
          path: "StudentCoursePage",
          icon : 'personal_video'
        },
        {
          name: "Achievements",
          path: "StudentProfilePage",
          icon : 'check_circle'
        },
        {
          name: "Grades",
          path: "StudentProfilePage",
          icon : 'grade'
        },
        {
          name: "Settings",
          path: "StudentProfilePage",
          icon : 'settings'
        },
      ],
    };
  },
  methods: {
    showSidebar() {
      this.sideBar = true;
      this.btn = false;
    },
    logout(){
        ApiService.post('logout').then(()=>{  
            this.authStore.destroyAuth()         
            this.$router.push('/')
        }).catch(err=>console.log(err));
    }
  },
};
</script>

<style scoped></style>
