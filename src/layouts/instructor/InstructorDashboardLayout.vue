<template>
  <div class="flex justify-end">
    <aside :class="sideBar ? 'sm:w-1/6 w-fit' : 'w-[50px]'" class="h-screen fixed top-0 left-0 border-r border-[#e2e8f0] z-50 bg-white pr-[10px] py-2">
      <button @click="sideBar = !sideBar" style="padding-left: 12px;">
        <span class="material-icons-outlined">menu</span>
      </button>
      <ul>
        <li :title="item.name" class="my-6 font-semibold" v-for="item in sideItems" :key="item.name">
          <router-link :to="{name : item.path}" class="flex items-center">
            <span class="material-icons" style="margin-right: 8px; background-color: rgb(249 250 251 / var(--tw-bg-opacity));z-index: 1; padding-left: 12px;">{{ item.icon }}</span>
            <Transition>
              <span v-if="sideBar" style="z-index: 0.5;">{{ item.name }}</span>
            </Transition>
          </router-link>
        </li>
        <li class="font-semibold border-t border-t-gray-3">
          <button @click="logout" class="flex items-center my-5 text-red">
              <span  class="material-icons" style="margin-right: 8px; background-color: rgb(249 250 251 / var(--tw-bg-opacity));z-index: 1; padding-left: 12px;">logout</span>
            <Transition>
              <span v-if="sideBar" style="z-index: 0.5;">Logout</span>
            </Transition>
          </button>
        </li>
      </ul>
    </aside>
 <!-- :class="sideBar ? 'sm:w-5/6 w-screen' : 'w-[calc(100vw_-_60px)]'" -->
    <div  :class="sideBar ? 'sm:w-5/6 w-[calc(100vw_-_50px)]' : 'w-[calc(100vw_-_50px)]'"  class="transition-all ease-in-out">
      <nav class="sticky top-0 z-40 flex justify-end w-full p-2 text-white shadow-lg bg-blue-2">
        <router-link :to="{name : 'HP_Page'}">
          <span class="material-icons-sharp">home</span>
        </router-link>
        <span style="margin: 0px 12px;" class="material-icons-sharp">notifications</span>
      </nav>
      <RouterView />
    </div>

  </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { useAuthStore } from '@/stores/auth';
export default {
  data() {
    return {
      sideBar: false,
      authStore : useAuthStore(),
      sideItems: [
        {
          name: "Profile",
          path: "InstructorProfilePage",
          icon : 'account_circle'
        },
        {
          name: "Courses",
          path: "InstructorCoursePage",
          icon : 'personal_video'
        },
        {
          name: "Assignments Scores",
          path: "HP_Page",
          icon : 'assignment'
        },
        {
          name: "Achievements",
          path: "StudentProfilePage",
          icon : 'check_circle'
        },
        {
          name: "Settings",
          path: "InstructorSettingsPage",
          icon : 'settings'
        },
      ],
    };
  },
  methods: {
    showSidebar() {
      this.sideBar = true;
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

<style scoped>
.SideBar-enter-from , .SideBar-leave-to{
        transform: translateX(-100px);
    }
.SideBar-enter-active , .SideBar-leave-active {
        transition: all 0.5s ease;
    }
</style>