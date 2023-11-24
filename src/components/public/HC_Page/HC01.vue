<template>
    <div>
        <div class="text-white ">
            <button v-for="status in courseStatusService.status" :key="status" @click="filterCourses(status)" class="w-24 py-1 mx-2 my-1 rounded-2xl bg-blue">{{status}}</button>
        </div>
        <card-component v-for="course in courses" :key="course.id"  :name="course.name" :image="course.image.image">
            <template v-slot:body>
                <div class="flex-wrap text-sm font-semibold sm:flex">
                    <p class="sm:w-1/2 py-1.5">available age - over {{ course.age }}</p>
                    <p class="sm:w-1/2 py-1.5 text-blue-2">{{course.status}}</p>
                    <p class="sm:w-1/2 py-1.5">fee - {{ course.fee }}</p>
                    <span class="sm:w-1/2 py-1.5">
                        <p class="text-green" v-if="course.available">Available Now</p>
                        <p class="text-red" v-else>Temporary Closed</p>
                    </span>
                </div>
            </template>
            <template v-slot:action>
                <router-link class="block w-full" :to="{ name : 'HCD_Page',params : { id : course.id }}">
                    Enroll Now
                </router-link>
            </template>
        </card-component>
        <!-- <div class="py-4 my-6 shadow-md sm:p-6 sm:flex" v-for="course in filteredCourses" :key="course" >
                <img v-if="course.image" class="sm:w-1/4"  :src="filePath.imagePath(course.image.image)" alt="">
                <div class="flex-col justify-between px-2 sm:px-4 sm:flex sm:w-1/2">
                    <h1 class="mt-2 text-xl text-black sm:mt-0">{{ course.name }}</h1>
                    <div class="flex-wrap text-sm font-semibold sm:flex">
                        <p class="sm:w-1/2 py-1.5">available age - over {{ course.age }}</p>
                        <p class="sm:w-1/2 py-1.5 text-blue-2">{{course.status}}</p>
                        <p class="sm:w-1/2 py-1.5">fee - {{ course.fee }}</p>
                        <span class="sm:w-1/2 py-1.5">
                            <p class="text-green" v-if="course.available">Available Now</p>
                            <p class="text-red" v-else>Temporary Closed</p>
                        </span>
                    </div>
                    <router-link :to="{ name : 'HCD_Page',params : { id : course.id }}">
                        <button class="w-full py-2 mt-4 text-white border sm:w-3/4 hover:bg-transparent bg-green hover:text-green border-green">Enroll Now</button>
                    </router-link>
                </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
import courseStatusService from '../../../services/public/courseStatusService'
import filePath from '../../../services/public/filePath'
import CardComponent from '@/components/layout/CardComponent.vue'
// import CardList from '@/components/CardList.vue'
    export default {
        components : {
            CardComponent
        },
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
                    this.courses = res.data.data
                    this.filteredCourses = this.courses
                }).catch(res => {
                    console.log(res);
                })
            },

            filterCourses(status){
                if (status == 'All') {
                    this.filteredCourses = this.courses;
                } else {
                    this.filteredCourses = this.courses.filter((course) => {
                    return course.status == status.toLowerCase()
                })
                }
                
            }
       }
    }
</script>

<style lang="scss" scoped>

</style>