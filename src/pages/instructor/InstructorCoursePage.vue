<template>
    <div>
        <h1 class="text-2xl font-bold m-6">Courses</h1>
        <div v-for="course in courses" :key="course.id" class="bg-gray-1 py-3 flex my-10 shadow-lg mx-8 w-2/3 rounded-lg">
            <img class="w-[300px] h-[150px] bg-green mx-4 rounded-lg my-4 object-cover" :src="filePath.imagePath(course.course.image.image)" ref="image" alt="">
            <div class="my-4 mx-6">
                <h1 class="text-xl font-bold mb-3">{{ course.course.name }}</h1>
                <p>{{ course.name }}</p>
                <button class="bg-blue-2 py-0.5 px-2 text-white mt-14">Go to Week</button>
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