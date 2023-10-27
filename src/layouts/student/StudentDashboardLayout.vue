<template>
  <div class=" bg-[#eae8e8]">
      <nav :class="SideBar ? 'w-full' : ''" class="transition sticky top-0 z-50 flex justify-between px-4 py-1 bg-green">
        <button @click="SideBar = !SideBar" class="block mx-3 mt-2 text-white">
          <span style="font-size : 30px;" class="material-icons-sharp">menu</span>
        </button>
        <button class="text-white">
          <span style="margin: auto 0px; margin-right: 20px; font-size : 30px;" class="material-icons-sharp">house</span>
          <span style="margin: auto 0px; font-size : 30px;" class="material-icons-sharp">notifications</span>
        </button>
        <button class="sm:hidden">
          <span style="margin: auto 0px;" class="material-icons-sharp">house</span>
          <span style="margin: auto 0px;" class="material-icons-sharp">notifications</span>
        </button>
      </nav>
      <div class="flex justify-between">
        <aside class="sticky top-0 hidden h-screen sm:block" :class="SideBar ? 'w-1/6' : 'w-1/12'">  
          <div>
            <ul class="mt-4">
              <li class="py-2 my-4" v-for="item in sideItems" :key="item.name">
                <router-link :to="{name : item.path}" class="flex items-center hover:text-blue-2">
                  <span style="background-color: #eae8e8; z-index: 1;width: 50px;text-align: end;margin-right: 5px;" class="material-icons-outlined">{{ item.icon }}</span>
                  <Transition name="SideBar">
                    <span style="z-index: 0.1; width: 30px;" v-if="SideBar">{{ item.name }}</span>
                  </Transition>
                </router-link>
              </li>
              <li class="py-2 font-bold my-4 border-t border-gray-2 text-red">
                <button @click="logout" class="flex w-full items-center">
                  <span  style="background-color: #eae8e8; z-index: 1;width: 50px;text-align: end;margin-right: 5px;"  class="material-icons-outlined">logout</span> 
                  <Transition name="SideBar">
                    <span style="z-index: 0.1;" v-if="SideBar">Logout</span>
                  </Transition>
                </button>
              </li>
            </ul>
          </div>
        </aside>
        <main style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"  :class="SideBar ? 'w-5/6' : 'w-11/12'" class="z-10 mx-4 mt-4 bg-white rounded-2xl">
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
      SideBar: false,
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

<style scoped>
.SideBar-enter-from , .SideBar-leave-to{
        transform: translateX(-100px);
    }
.SideBar-enter-active , .SideBar-leave-active {
        transition: all 0.5s ease;
    }
</style>
