<template>
    <div>
        <h1 class="m-6 text-2xl font-bold">Courses</h1>
        <card-component :name="course.course_name" :image="course.image" v-for="course in courses" :key="course.id">
            <template v-slot:body>
                <p>{{ course.batch_name }}</p>
            </template>
            <template v-slot:action>
                <router-link class="block w-full" to="/">Go to Weeks</router-link>
            </template>
        </card-component>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '@/services/public/filePath';
import CardComponent from '@/components/layout/CardComponent.vue';
    export default {
        components : {
          CardComponent  
        },
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
