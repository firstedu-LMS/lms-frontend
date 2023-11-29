<template>
    <div>
        <div class="flex justify-between p-1 sm:p-6">
            <div class="flex items-center sm:p-4">
                <span @click="$router.go(-1)" style=" font-size: 1.8rem;cursor: pointer;margin-right: 10px;" class="material-icons-outlined">west</span>
                <span v-if="weeks.length && weeks[0].course">{{ weeks[0].course.name }}</span>
                <span class="material-icons-outlined">chevron_right</span>
                <span>Weeks</span>
            </div>
            <button @click="createWeek" class="text-blue-2 sm:px-16">
                <span style="font-size: 2rem" class="material-icons-sharp">add_circle</span>
            </button>
        </div>
        <div v-for="week in weeks" :key="week.id" class="p-2 sm:px-24 sm:p-0">
            <router-link :to="{name : 'InstructorLessonsPage' , params : {course_id : week.course_id,batch_id : week.batch_id,week_id : week.id}}" class="block w-full border-b sm:my-6 hover:text-blue-2">{{ week.week_number }}</router-link>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';

    export default {
        data () {
            return {
                batch_id : this.$route.params.batch_id,
                course_id : this.$route.params.course_id,
                weeks : [],

            }
        },
        mounted () {
            this.getWeek()
        },
        methods : {
            createWeek () { 
                let obj = {
                    course_id : this.course_id,
                    batch_id : this.batch_id
                }
                ApiService.post(`instructors/courses/${this.batch_id}/weeks` , obj).then(() => {
                    this.getWeek();
                }).catch((res) => {
                    console.log(res);
                })
            },
            getWeek () {
                ApiService.get(`instructors/courses/${this.batch_id}/weeks`).then((res) => {
                this.weeks = res.data.data
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })
            }
        }
    }
</script>

<style  scoped>

</style>