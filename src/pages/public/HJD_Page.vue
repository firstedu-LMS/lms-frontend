<template>
    <div class="justify-center">
        <div v-for="career in careers " :key="career" class="shadow-lg  my-6 mx-16 px-6  p-4 ">
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
            axios.get(`http://localhost:8000/api/admin/careers`).then((res) => {
                console.log(res.data.data);
                 this.careers = res.data.data 
            }).catch((res) => {
                console.log(res);
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>