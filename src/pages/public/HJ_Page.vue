<template>
    <div class="px-2">
        <HPNavbar />
        <div v-for="career in careers " :key="career" class="shadow-md w-[90%] mx-auto my-6 px-6  py-4">
            <h1 class="text-lg font-semibold">{{ career.name }}</h1>
            <h6 class="my-1">Vacancy - {{ career.vacancy }}</h6>
            <h6 class="my-1">Position - {{ career.position }}</h6>
            <router-link :to="{name : 'HJD_Page' , params : {id : career.id}}"  class="p-1 mt-2 text-sm text-white bg-blue-2">Show Details</router-link>
        </div>
    </div>
</template>

<script>
import HPNavbar from '@/layouts/public/HPNavbar.vue';
import axios from 'axios'
    export default {
        components : {
            HPNavbar
        },
        data() {
            return {
                careers : [],
            }
        },
        mounted() {
            axios.get(`admin/careers`).then((res) => {
                 this.careers = res.data.data 
            }).catch((res) => {
                alert('Something went wrong!')
                console.log(res);
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>