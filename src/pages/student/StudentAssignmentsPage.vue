<template>
    <div>
        <div class="flex items-center my-6">
            <button @click="$router.go(-1)" class="sm:ml-4">
                <span class="material-icons-outlined">arrow_back</span>
            </button>
            <h1 class="mx-4 text-xl font-bold border-b-2">Assignments</h1>
        </div>
        <div  v-for="assignment in  assignments" :key="assignment.id" class="sm:mx-16 mx-2 my-3 py-1.5">
            <div @click="!assignment.finish && !assignment.over_test_date ? $router.push({name : 'StudentAssignmentPage' , params :{id : assignment.id}}) : ''" :class="`text-${checkAssignmentForColor(assignment)}`" class="justify-between w-full p-2 border-b sm:flex">
                <h1>{{ assignment.title }}</h1>
                <div class="flex py-3 sm:py-0"  v-if="assignment.finish">
                    <button class="px-4 py-1 mr-4 text-white bg-green rounded-xl">{{ assignment.test_date }} / {{ assignment.test_time }}</button>
                    <span class="px-1 py-1 text-white rounded-full h-fit material-icons-sharp bg-green">task_alt</span>
                </div>
                <div class="flex py-3 sm:py-0" v-else-if="assignment.over_test_date">
                    <button class="px-4 py-1 mr-4 text-white bg-red rounded-xl" disabled>{{ assignment.test_date }} / {{ assignment.test_time }}</button>
                    <span class="px-1 py-1 text-white rounded-full h-fit material-icons-sharp bg-red">highlight_off</span>
                </div>
                <div class="flex py-3 sm:py-0" v-else>
                    <router-link :to="{name : 'StudentAssignmentPage' , params :{id : assignment.id}}" class="px-4 py-1 mr-4 text-white bg-blue-2 rounded-xl">{{ assignment.test_date }} / {{ assignment.test_time }}</router-link>
                    <span class="px-1 py-1 text-white rounded-full h-fit material-icons-sharp bg-blue-2">mobile_friendly</span>
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
                id : this.$route.params.id,
                course_id : this.$route.params.course_id,
                batch_id : this.$route.params.batch_id,
                assignments : {},
            }
        },
        methods : {
            checkAssignmentForColor (assignment) {
                if (assignment.finish) {
                    return "green"
                } else if(assignment.over_test_date) {
                    return "red"
                } else {
                    return "blue-2 cursor-pointer hover:bg-gray-3"
                }
            }
        },
        mounted () {
            ApiService.get(`students/assignment/${this.course_id}/${this.batch_id}`).then((res) => {
                console.log(res.data);
                this.assignments = res.data.data
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>

