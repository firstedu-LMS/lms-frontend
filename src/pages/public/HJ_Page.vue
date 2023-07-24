<template>
    <div class="px-2">
        <div v-for="career in careers " :key="career" class="shadow-md w-[90%] mx-auto my-6 px-6  py-4">
            <h1 class="font-semibold text-lg">{{ career.name }}</h1>
            <h6>Vacancy - {{ career.vacancy }}</h6>
            <h6>Position - {{ career.position }}</h6>
            <button  class="bg-blue-2 p-1 mt-2 text-white text-sm">Show Details</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
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