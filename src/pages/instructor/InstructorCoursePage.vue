<template>
    <div class="sm:p-8 p-1">
        <h1 class="text-2xl font-bold">Courses</h1>
        <div v-for="course in courses" :key="course.id" class="bg-gray-1 p-2 sm:flex my-10 shadow-lg sm:w-2/3 rounded-lg">
            <img class="sm:w-1/3 w-full rounded-lg" :src="filePath.imagePath(course.image)" ref="image" alt="">
            <div class="py-4 sm:px-4">
                <h1 class="text-xl font-bold mb-3">{{ course.course_name }}</h1>
                <p>{{ course.batch_name }}</p>
                <button class="bg-blue-2 py-0.5 px-2 text-white mt-4">Go to Week</button>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '@/services/public/filePath';
    export default {
        data () {
            return {
                filePath : filePath,
                courses : ''
            }
        },
        mounted () {
            ApiService.get('instructors/courses').then((res) => {
                this.courses = res.data.data
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style  scoped>

</style>
