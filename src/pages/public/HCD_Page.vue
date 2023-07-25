<template>
    <div>
        <HPNavbar/>
        <div class="p-4 mx-8 my-4">
            <h1 class="font-bold sm:py-1 text-blue-2 text-xl">{{ course.name }}</h1>
            <div class="sm:py-6  justify-around sm:flex">
                <div class="w-2/3 sm:w-full">                
                    <h1 class="font-bold sm:py-1 py-2 text-xl">{{ course.description }}</h1>
                </div>
                <div class="sm:w-1/3  text-center">
                    <ul class="w-full sm:w-[55%] text-sm">
                        <li class="text-white bg-indigo font-bold ">Summary</li>
                        <li>Availabel age - over {{ course.age }}</li>
                        <li>Fee - {{ course.fee }}</li>
                        <li>Status - {{ course.status }}</li>
                        <li class="text-green" v-if="course.available">Available Now</li>
                        <li class="text-red" v-else>Temporary Closed</li>
                    </ul>
                </div>
            </div>
        </div>
        <button class="w-[80%] py-2 ml-8 sm:mt-4 mt-2 text-white border sm:w-1/5 font-semibold  bg-blue-2 ">Enroll Now</button>
        <button class="w-[80%] py-2 ml-8 sm:mt-4 mt-2 text-white border sm:w-[10%] font-semibold  bg-gray-2">Back</button>
    </div>
</template>

<script>
import HPNavbar from '@/components/layouts/public/HPNavbar.vue'
import axios from 'axios'
    export default {
        components : {
            HPNavbar
        },
        data() {
            return {
                course : {},
                id: this.$route.params.id,
            }
        },
        mounted() {
            axios.get(`/courses/${this.id}`).then((res) => {
                this.course = res.data.data
            })
        },
    }
</script>

<style scoped>
 li{
        font-weight: 600;
        padding: 0.3rem;
        text-align: center;
        border: 1px solid gray;
    }
</style>