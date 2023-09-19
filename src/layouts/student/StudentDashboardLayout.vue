<template>
  <div>
    <div class="w-full sm:w-5/6 h-fit">
      <nav class="sticky top-0 flex justify-between px-2 bg-white items-between">
        <div>
          <img src="/images/layout/logo.png" class="w-24 p-2" alt="" />
        </div>
        <div class="flex items-center justify-end">
          <span class=""><i class="material-icons-sharp">notifications</i></span>
          <span @click="showSidebar" class="ml-3 sm:hidden"><i class="material-icons-sharp">menu</i></span>
        </div>
      </nav>
      <main>
        <router-view></router-view>
      </main>
    </div>
    <div v-if="sideBar" class="fixed top-0 right-0 h-screen bg-teal">
      <div class="border-b-4 border-b-gray">
        <span v-for="item in sideItems" :key="item">
          <router-link :to="{ name: item.path }">
            <p class="py-2 my-8 text-lg font-semibold text-center text-white hover:text-gray">
              {{ item.name }}
            </p>
          </router-link>
        </span>
      </div>
        <span class="py-5 mx-20 my-2 text-lg font-semibold text-center text-red">Log Out</span>
    </div>
    <div class="fixed top-0 right-0 hidden w-1/6 h-screen sm:block bg-teal">
      <div class="border-b-2 border-b-gray-2">
        <span v-for="item in sideItems" :key="item">
          <router-link :to="{ name: item.path }">
            <p class="py-2 my-4 text-lg font-semibold text-center text-white hover:text-gray">
              {{ item.name }}
            </p>
          </router-link>
        </span>
      </div>
        <button @click="logout" class="px-1 mt-4 text-lg font-semibold text-center text-red">Log Out</button>
    </div>  
  </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import TokenService from '@/services/TokenService';
export default {
  data() {
    return {
      btn: true,
      sideBar: false,
      sideItems: [
        {
          name: "Profile",
          path: "StudentProfilePage",
        },
        {
          name: "Profile",
          path: "StudentProfilePage",
        },
        {
          name: "Profile",
          path: "StudentProfilePage",
        },
        {
          name: "Profile",
          path: "StudentProfilePage",
        },
        {
          name: "Profile",
          path: "StudentProfilePage",
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
            TokenService.destroyToken();
        }).catch(err=>console.log(err));
    }
  },
};
</script>

<style scoped></style>
