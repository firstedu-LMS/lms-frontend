<template>
    <div>
        <HPNavbar/>
        <router-view></router-view>
    </div>
</template>

<script>
import HPNavbar from '@/components/layouts/public/HPNavbar.vue'
    export default {
        components : {
            HPNavbar,
        }
    }
</script>

<style lang="scss" scoped>

</style>