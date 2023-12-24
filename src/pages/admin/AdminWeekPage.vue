<template>
    <div>
        <div class="flex justify-between text-white ">
            <!-- <h1 v-if="weeks[0]" class="flex items-center p-2 font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <router-link :to="{name : 'AdminBatchPage' , params : {course_id : weeks[0].course.id}}">{{ weeks[0].course.name }}</router-link>
                 <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <span>{{ weeks[0].batch.name }}</span>
                 <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <span class="text-blue-2">Weeks</span>
            </h1>
            <h1 v-else class="flex items-center p-2 font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
            </h1> -->
            <div class="flex my-auto mr-6">

                <div class="relative flex flex-col items-center py-0.5 bg-white mx-6 text-gray">
                    <button :disabled="loading" class="flex items-center justify-between w-32 px-4 rounded" @click="onSelect = !onSelect">
                        <span>Weeks</span> 
                        <span class="material-icons-outlined">arrow_drop_down</span>
                    </button>
                    <button @click="changePage" class="absolute z-50 w-32 px-4 py-1 bg-white rounded top-8" v-if="onSelect">Assignment</button>
                </div>

                <button @click="addWeek" class="px-6 h-fit my-auto rounded shadow-lg py-0.5 bg-indigo">New +</button>
            </div>
        </div>
        <vue-good-table
         :columns="columns"
         :rows="weeks"
        >
        <template #table-column="props">
            <span class="text-sm">{{ props.column.label }}</span>
        </template>
            <template #table-row="props">
                <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
                </div>

                <span class="flex" v-if="props.column.field == 'actions'">
                    <router-link :to="{name : 'AdminLessonPage' , params : {course_id : props.row.course.id , batch_id : props.row.batch_id, week_id : props.row.id}}" class="px-3 text-sm rounded-lg py-0.5 mx-2 text-white bg-indigo flex items-center" >
                        Lessons<span style="font-size: 0.8rem;margin-left:4px;" class="material-icons-sharp">check_circle</span>
                    </router-link>
                    <button :disabled="loading" class="px-3 text-sm rounded-lg py-0.5 mx-2 text-white bg-red flex items-center" @click="deleteWeek(props.row.id)">
                        Delete<span style="font-size: 0.8rem;margin-left:4px;"  class="material-icons-sharp">cancel</span>
                    </button>
                </span>

                <span class="text-sm" v-else>{{props.formattedRow[props.column.field]}}</span>

            </template>

        </vue-good-table>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import { VueGoodTable } from 'vue-good-table-next'
    export default {
        components : {
            VueGoodTable
        },
        data() {
            return {
                page : 'weeks',
                loading : false,
                weeks : [],
                batch_deleted : false,
                onSelect : false,
                columns : [
                    {
                        field : 'week_number',
                        label : 'Week Number'
                    },
                    {
                        field : 'actions',
                        label : 'Actions',
                        width : '30%'
                    }
                ]
            }
        },
        methods: {
            getWeeks(){
                this.loading = true
                ApiService.get(`admin/weeks/all/${this.$route.params.batch_id}`).then((res) => {
                    this.weeks = res.data.data
                    console.log(this.weeks);
                    this.loading = false
                }).catch((res) => {
                    if(res.response.status == 500) {
                        this.batch_deleted = true;
                    }
                })
            },
            changePage() {
                    this.$router.push({name : 'AdminAssignmentPage' , params : {course_id : this.$route.params.course_id , batch_id : this.$route.params.batch_id}})
            },
            deleteWeek(id){
                this.loading = true
                ApiService.delete(`admin/weeks/${id}`).then(()=>{
                    this.loading = false
                    this.getWeeks();
                }).catch(res => {
                    console.log(res);
                })
            },
            addWeek(){
                this.loading = true
                ApiService.post(`admin/weeks`,{"course_id" : this.$route.params.course_id , "batch_id" : this.$route.params.batch_id}).then(() => {
                    this.loading = false
                    this.getWeeks();
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted() {
            this.getWeeks();
        },
    }
</script>

<style scoped>

</style>