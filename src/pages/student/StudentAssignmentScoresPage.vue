<template>
    <div>
        <h1 class="py-6 sm:px-10 text-2xl sm:-ml-0 ml-4 font-bold">Assignments Scores</h1>
        <div v-for="asi in assignments_scores" :key="asi.id" class="bg-gray-3 sm:flex justify-between py-4 sm:mx-10 mx-6 px-4 shadow-lg font-bold">
            <h1>{{ asi.assignment.title }}</h1>
            <p>{{ asi.assignment.test_date }} // {{ asi.assignment.test_time }}</p>
            <p>{{ asi.score }} Mark</p>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';

    export default {
        data () {
            return {
                course_id : this.$route.params.course_id,
                assignments_scores : '',
            }
        },
        mounted () {
            ApiService.get(`students/${this.course_id}/assignments-scores`).then((res) => {
                this.assignments_scores = res.data.data;
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>