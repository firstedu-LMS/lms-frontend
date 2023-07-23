<template>
    <div class="justify-center">
        <div class=" text-white">
            <button class="px-2 py-1 mx-2 w-24 rounded-2xl bg-blue" v-for="status in courseStatusService.status" :key="status" >{{status}}</button>
        </div>
        <div class="flex p-6 my-6 shadow-md" v-for="course in filteredCourses" :key="course" >
                <img v-if="course.image" class="w-1/4 h-fit"  :src="filePath.imagePath(course.image.image)" alt="">
                <div class="px-4 w-1/2">
                    <h1 class="text-xl text-black">{{ course.name }}</h1>
                    <div class="flex flex-wrap text-sm font-semibold">
                        <span class="w-1/2 py-1.5">available age - over {{ course.age }}</span>
                        <span class="w-1/2 py-1.5 text-blue-2">{{course.status}}</span>
                        <span class="w-1/2 py-1.5">fee - {{ course.fee }}</span>
                        <span class="w-1/2 py-1.5">
                            <p class="text-green" v-if="course.available">Available Now</p>
                            <p class="text-red" v-else>Temporary Closed</p>
                        </span>
                    </div>
                    <button class="w-3/4 hover:bg-transparent text-white my-4 py-2 bg-green border hover:text-green border-green">Enroll Now</button>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import courseStatusService from '../../../services/public/courseStatusService'
import filePath from '../../../services/public/filePath'
    export default {
        data() {
            return {
                courseStatusService : courseStatusService,
                filePath : filePath,
                courses : [],
                filteredCourses : [],
            }
        },
       mounted() {
        this.getCourses();
       },
       methods : {
            getCourses(){
                axios.get('courses').then(res => {
                    console.log(res);
                    this.courses = res.data.data
                    this.filteredCourses = this.courses
                }).catch(res => {
                    console.log(res);
                })
            }
       }
    }
</script>

<style lang="scss" scoped>

</style>