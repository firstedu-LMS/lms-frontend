<template>
    <div class="p-4">
        <button @click="$router.go(-1)">
            <span class="material-icons-outlined">arrow_back</span>
        </button>
        <div class="flex justify-between">
            <h1 v-if="weeks.length && weeks[0].course" class="my-4 text-2xl font-bold underline">{{ weeks[0].course.name }}</h1>
            <router-link :to="{name : 'StudentAssignmentsPage' , params : {student_id : student_id , course_id : course_id , batch_id : batch_id}}"  class="px-2 py-1 my-4 text-white bg-blue-2">Asignments</router-link>
        </div>
        <ul>
            <li class="px-8 py-3 text-lg font-bold border border-gray-2">Week Numbers</li>
            <li class="px-8 py-3 border border-t-0 hover:text-blue-2 border-gray-2" v-for="week in weeks" :key="week.id">
                <router-link v-if="week.locked" :to="{name : 'StudentLessonDetailPage' , params : {student_id : student_id , course_id : course_id , batch_id : batch_id , week_id : week.id}}" class="flex items-center">
                    {{ week.week_number }}
                </router-link>
                <span v-else class="flex items-center">
                    {{ week.week_number }}
                    <span style="color: red; font-size: 18px;margin-left: 7px; margin-top: -1px;" class="material-icons-sharp">lock</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';

    export default {
        data() {
            return {
                student_id : this.$route.params.student_id,
                course_id : this.$route.params.course_id,
                batch_id : this.$route.params.batch_id,
                weeks : []
            }
        },
        mounted(){
            this.getWeeks();
        },
        methods : {
            getWeeks() {
                ApiService.get(`students/get-weeks-of-course/${this.student_id}/${this.course_id}/${this.batch_id}`).then((res) => {
                    this.weeks = res.data.data;
                    console.log(this.weeks);
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>