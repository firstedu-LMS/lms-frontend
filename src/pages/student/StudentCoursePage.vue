<template>
    <div>
        <div class="flex p-1 sm:p-4">
            <button :class="show_progress ? 'bg-[#89CFF0]' : ''" @click="show_progress = true" class="p-1 rounded-b-none rounded-tr-lg sm:font-bold max-sm:text-sm">IN PROGRESS
                <span class="px-2 py-1 mx-1 bg-white rounded-full" >{{ profile.in_progess_course_count }}</span>
            </button>
            <button :class="!show_progress ? 'bg-[#89CFF0]' : ''" @click="show_progress = false" class="p-2 rounded-b-none rounded-tr-lg sm:font-bold max-sm:text-sm">COMPLETED
                <span class="px-2 py-1 mx-1 bg-white rounded-full">{{ profile.course_completion_count }}</span>
            </button>
        </div>
        <div class="px-1 py-8 sm:p-10">
            <router-link :to="{name : 'HC_Page'}" class="border border-blue-2 text-blue-2 px-3 py-1.5 font-bold hover:bg-blue-2 hover:text-white">DISCOVER COURSES</router-link>
            <div v-if="show_progress">
                <card-component :name="course.batch.course.name" :image="course.batch.course.image.image" v-for="course in course_per_student" :key="course.id">
                    <template v-slot:body>
                        <h3>{{ course.batch.name }}</h3>
                        <div class="relative flex items-center">
                            <label class="absolute z-50 text-white left-4" for="success">{{ course.percentage }}%</label>
                            <progress class="w-full h-6 my-2 sm:w-3/4" :value="course.percentage" id="success" max="100"></progress>
                        </div>
                    </template>
                    <template v-slot:action>
                        <router-link class="block w-full" :to="{name :'StudentCourseDetailPage' , params : {student_id : profile.id , course_id : course.course_id , batch_id : course.batch.id}}">Continue</router-link>       
                    </template>
                </card-component>
                <!-- <div class="my-12 sm:flex"  v-for="course in course_per_student" :key="course.id">
                    <img v-if="course.batch" class="sm:w-1/4" :src="filePath.imagePath(course.batch.course.image.image)" alt="">
                    <div class="flex-col justify-between sm:mx-3 sm:px-4 sm:flex sm:w-1/2">
                        <h1 class="text-xl font-bold text-black max-sm:text-xl sm:mt-0">{{ course.batch.course.name }}</h1>    
                        <h3>{{ course.batch.name }}</h3>
                        <div class="relative flex items-center">
                            <label class="absolute z-50 text-white left-4" for="success">{{ course.percentage }}%</label>
                            <progress class="z-10 w-full h-6 my-2 bg-indigo" :value="course.percentage" id="success" max="100"> 32% </progress>
                        </div>
                        <router-link :to="{name :'StudentCourseDetailPage' , params : {student_id : profile.id , course_id : course.course_id , batch_id : course.batch.id}}" class="block w-full py-2 text-xl font-semibold text-center text-white border max-sm:py-1 max-sm:text-lg hover:bg-transparent bg-green hover:text-green border-green">Continue</router-link>       
                    </div>
                </div> -->
            </div>

            <div v-else>
                completed
            </div>

        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import filePath from '@/services/public/filePath'
import CardComponent from '@/components/layout/CardComponent.vue'
import { useAuthStore } from '@/stores/auth'
    export default {
        components : {
            CardComponent
        },
        data() {
            return {
                show_progress : true,
                profile : {},
                course_per_student : [],
                filePath : filePath,
                authStore : useAuthStore()
            }
        },
        mounted(){
            this.profile = this.authStore.user.student;
            ApiService.get(`students/course-per-students/${this.profile.id}`).then((res) => {
                this.course_per_student  = res.data.data
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })

        }
    }
</script>

<style scoped>
progress::-webkit-progress-bar {
   background-color: rgb(223, 213, 213);
}
progress::-webkit-progress-value {
   background-color: rgb(17, 216, 17);
}
</style>