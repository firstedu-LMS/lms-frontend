<template>
    <div>
        <div class="flex">
            <router-link to="/">
                <span style="font-size: 30px ; font-weight: 300; margin-top : 15px; margin-left: 20px;" class="material-icons-sharp">arrow_back</span>
            </router-link>
            <h1 class="text-xl w-32 font-bold my-4 mx-4 border-b-2">Assignments</h1>
        </div>
        <div  v-for="assignment in  assignments" :key="assignment.id" class="sm:mx-16 mx-2 my-3 py-1.5 border-b border-b-blue-2" :class="assignment.over_test_date ? 'border-b border-b-red': ''">
            <div class="flex justify-between w-full text-green" v-if="assignment.finish">
                <h1>{{ assignment.title }}</h1>
                <div class="flex">
                    <button class="py-1 px-4 bg-green rounded-xl mr-4 text-white">{{ assignment.test_date }}/{{ assignment.test_time }}</button>
                    <span class="material-icons-sharp py-1 px-1 rounded-full bg-red text-white">task_alt</span>
                </div>
            </div> 
            <div class="sm:flex justify-between w-full text-red" v-if="assignment.over_test_date">
                <h1>{{ assignment.title }}</h1>
                <div class="flex sm:py-0 py-3">
                    <button class="py-1 px-4 bg-red rounded-xl mr-4 text-white" disabled>{{ assignment.test_date }}/{{ assignment.test_time }}</button>
                    <span class="material-icons-sharp py-1 px-1 rounded-full bg-red text-white">highlight_off</span>
                </div>
            </div>
            <div class="sm:flex justify-between w-full text-blue-2" v-else>
                <h1>{{ assignment.title }}</h1>
                <div class="flex sm:py-0 py-3">
                    <router-link :to="{name : 'StudentDownloadPdfPage' , params :{id : assignment.id}}" class="py-1 px-4 bg-blue-2 rounded-xl mr-4 text-white">{{ assignment.test_date }}/{{ assignment.test_time }}</router-link>
                    <span class="material-icons-sharp py-1 px-1 rounded-full bg-blue-2 text-white">mobile_friendly</span>
                </div>
            </div>          
        </div>
    </div>
</template>
<script>
import ApiService from '@/services/ApiService';

    export default {
        data () {
            return {
                course_id : this.$route.params.course_id,
                batch_id : this.$route.params.batch_id,
                assignments : {}
            }
        },
        mounted () {
            ApiService.get(`students/assignments/`).then((res) => {
                this.assignments = res.data.data;
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>