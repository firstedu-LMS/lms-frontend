<template>
    <div>
        <HPNavbar />
        <div class="sm:w-[90%] p-4 sm:px-0 mx-auto">
            <HC01 />
        </div>
    </div>
</template>

<script>
import HPNavbar from '@/components/layouts/public/HPNavbar.vue'
import HC01 from '@/components/public/HC_Page/HC01.vue'
    export default {
        components : {
            HPNavbar,HC01
        }
    }
</script>

<style lang="scss" scoped>

</style>