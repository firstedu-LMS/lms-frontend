<template>
    <div>
        <h1 class="py-6 text-2xl font-bold text-center">Latest Courses</h1>
        <div class="justify-around text-white sm:flex">
            <div v-for="course in courses" :key="course.name" class="pb-2 flex flex-col justify-between my-4 sm:w-[23%] sm:my-0 bg-blue">
                <img v-if="course.image" :src="filePath.imagePath(course.image.image)" class="w-full" alt="">
                <h1 class="p-2 mb-3 text-xl font-semibold">{{ course.name }}</h1>
                <router-link :to="{name : 'HCD_Page' , params: {id : course.id} }" class="block py-1 mx-6 text-center sm:mx-2 hover:bg-cyan-2 bg-cyan">
                    Show  Detail
                </router-link>
            </div>
        </div>
        <p class="mt-6 text-center">
            <router-link :to="{name : 'HC_Page'}">
                <svg class="inline" width="40px" height="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 290.658 290.658" xml:space="preserve"><g><g><rect y="139.474" style="fill:#030303;" width="290.658" height="11.711"/></g></g></svg>
                see more
                <svg class="inline" width="40px" height="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 290.658 290.658" xml:space="preserve"><g><g><rect y="139.474" style="fill:#030303;" width="290.658" height="11.711"/></g></g></svg>
            </router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
import filePath from '@/services/public/filePath'
    export default {
        data () {
            return {
                filePath : filePath,
                courses : []
            }
        },
        mounted(){
            axios.get('courses').then((res) => {
                this.courses = res.data.data.slice(0,4);
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>