<template>
    <div id="layout" class="flex h-screen">
        <div class="w-1/6">
            <AdminSidebarLayout class="fixed top-0 w-1/6 h-full shadow-lg" />
        </div>
        <div class="w-5/6">
            <AdminNavbarLayout class="fixed top-0 right-0 z-40 w-5/6 shadow" />
            <div id="view" class="z-10 mt-12">
                <router-view></router-view>
            </div>
    </div>
  </div>
</template>

<script>
import AdminNavbarLayout from "./AdminNavbarLayout.vue";
import AdminSidebarLayout from "./AdminSidebarLayout.vue";
export default {
  components: {
    AdminNavbarLayout,
    AdminSidebarLayout,
  },
};
</script>

<style lang="scss" scoped>
</style>