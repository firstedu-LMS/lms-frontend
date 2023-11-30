<template>
    <div>
        <div class="justify-between p-1 py-6 sm:flex sm:p-6">
            <div class="flex flex-wrap items-center sm:p-4">
                <span @click="$router.go(-1)" style=" font-size: 1.8rem;cursor: pointer;margin-right: 10px;" class="material-icons-outlined">west</span>
                <router-link class="hover:text-blue-3" :to="{name : 'InstructorCoursePage'}">Courses</router-link>
                <span class="material-icons-outlined">chevron_right</span>
                <router-link class="hover:text-blue-3" :to="{name : 'InstructorWeekPage' , params : {course_id : lessons[0].course.id , batch_id : lessons[0].week.batch_id}}" v-if="lessons.length && lessons[0].course">{{ lessons[0].course.name }}</router-link>
                <span class="material-icons-outlined">chevron_right</span>
                <span v-if="lessons.length && lessons[0].week">{{ lessons[0].week.week_number }}</span>
                <span class="material-icons-outlined">chevron_right</span>
            </div>
            <div class="flex justify-center my-6 sm:mr-6 sm:my-auto">
                <router-link
                    class="px-6 py-2 cursor-pointer rounded-l-md"
                    active-class="text-white bg-cyan-2"
                    :to="{name : 'InstructorLessonsPage' , params : {course_id : parameters.course_id, batch_id : parameters.batch_id, week_id : parameters.week_id}}">
                    Table
                </router-link>
                <router-link
                    class="px-6 py-2 cursor-pointer rounded-r-md"
                    active-class="text-white bg-cyan-2"
                    :to="{name : 'CreateLessonPage' , params : {course_id : parameters.course_id, batch_id : parameters.batch_id, week_id : parameters.week_id}}">
                    + New
                </router-link>
            </div>
        </div>
        <div class="px-2 py-6">
                <div v-for="lesson in lessons" :key="lesson.id" class="p-2 sm:px-24 sm:p-0">
                    <router-link :to="{name : 'InstructorLessonPage' , params : {course_id : parameters.course_id, batch_id : parameters.batch_id, week_id : parameters.week_id, id : lesson.id}}" class="justify-between block w-full my-6 border-b sm:flex hover:text-blue-2">
                        <p>{{ lesson.name }}</p>
                        <p class="my-2 sm:my-0">{{ lesson.created_at }}</p>
                    </router-link>
                </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
    export default {
        data() {
           return {
            parameters : this.$route.params,
            lessons : [],
           } 
        },
        methods : {
            getLessons () {
                ApiService.get(`instructors/week/lessons/${this.parameters.week_id}`).then((res) => {
                    this.lessons = res.data.data;
                    console.log(res.data.data);
                }).catch((res) => {
                    console.log(res);
                })
            },
            deleteLesson(id) {
                ApiService.delete(`admin/lessons/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted() {
            this.getLessons();
        }

    }

</script>

<style scoped>

</style>