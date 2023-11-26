<template>
    <div>
        <div class="flex justify-between sm:p-6 p-1">
            <div class="flex sm:p-4">
                <span style=" font-size: xx-large;" class="material-icons-outlined">arrow_back</span>
                <h1 class="text-2xl font-bold sm:mx-4 ">Weeks</h1>
            </div>
            <button @click="createWeek" class="text-blue sm:px-16">
                <span style="font-size: xx-large" class="material-icons-sharp">add_circle</span>
            </button>
        </div>
        <div v-for="week in weeks" :key="week.id" class="sm:px-24 p-2 sm:p-0">
            <router-link to="/" class="sm:my-6 border-b block w-full">{{ week.week_number }}</router-link>
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