<template>
  <div>
    <div class="sm:w-5/6 w-full h-fit">
      <nav class="flex items-between sticky top-0 justify-between px-2 bg-white">
        <div>
          <img src="/images/layout/logo.png" class="w-24 p-2" alt="" />
        </div>
        <div class="flex items-center justify-end">
          <span class=""><i class="material-icons-sharp">notifications</i></span>
          <span @click="showSidebar" class="sm:hidden ml-3"><i class="material-icons-sharp">menu</i></span>
        </div>
      </nav>
      <main>
        <router-view></router-view>
      </main>
    </div>
    <div v-if="sideBar" class="fixed max-sm:w-2/3 top-0 right-0 sm:w-1/6 h-screen bg-teal">
      <div class="border-b-4 border-b-gray">
        <span v-for="item in sideItems" :key="item">
          <router-link :to="{ name: item.path }">
            <p class="text-center my-8 py-2 text-white hover:text-gray font-semibold text-lg">
              {{ item.name }}
            </p>
          </router-link>
        </span>
      </div>
        <span class="text-red text-center text-lg py-5 my-2 mx-20 font-semibold">Log Out</span>
    </div>
    <div class="fixed max-sm:hidden max-sm:w-2/3 top-0 right-0 sm:w-1/6 h-screen bg-teal">
      <div class="border-b-4 border-b-gray">
        <span v-for="item in sideItems" :key="item">
          <router-link :to="{ name: item.path }">
            <p class="text-center my-8 py-2 text-white hover:text-gray font-semibold text-lg">
              {{ item.name }}
            </p>
          </router-link>
        </span>
      </div>
        <span class="text-red text-center text-lg py-5 px-1 mt-4 mx-16 font-semibold">Log Out</span>
    </div>  
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped></style>
