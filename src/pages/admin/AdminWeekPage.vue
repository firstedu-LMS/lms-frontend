<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 v-if="weeks[0]" class="flex items-center p-2 font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <router-link :to="{name : 'AdminBatchPage' , params : {course_id : weeks[0].course.id}}">{{ weeks[0].course.name }}</router-link>
                 <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <span class="text-blue-2">{{ weeks[0].batch.name }}</span>
            </h1>
            <div class="my-auto mr-6">
                <button @click="addWeek" class="px-6 rounded shadow-lg py-0.5 bg-indigo">New +</button>
            </div>
        </div>
        <vue-good-table
         :columns="columns"
         :rows="weeks"
         :search-options="{enabled: true}"
        >
        <template #table-column="props">
            <span class="text-sm">{{ props.column.label }}</span>
        </template>
            <template #table-row="props">

                <span class="flex" v-if="props.column.field == 'actions'">
                    <router-link :to="{name : 'AdminLessonPage' , params : {course_id : props.row.course.id , batch_id : props.row.batch.id, week_id : props.row.id}}" class="px-3 text-sm rounded-lg py-0.5 mx-2 text-white bg-indigo flex items-center" >
                        Lessons<span style="font-size: 0.8rem;margin-left:4px;" class="material-icons-sharp">check_circle</span>
                    </router-link>
                    <button class="px-3 text-sm rounded-lg py-0.5 mx-2 text-white bg-red flex items-center" @click="deleteWeek(props.row.id)">
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
                weeks : [],
                columns : [
                    {
                        field : 'week_number',
                        label : 'Week Number'
                    },
                    {
                        field : 'actions',
                        label : 'Actions'
                    }
                ]
            }
        },
        methods: {
            deleteWeek(id){
                ApiService.delete(`admin/weeks/${id}`).then(()=>{
                    this.$router.push({name : "AdminCoursePage"})
                }).catch(res => {
                    console.log(res);
                })
            },
            addWeek(){
                ApiService.post(`admin/weeks`,{"course_id" : this.$route.params.course_id , "batch_id" : this.$route.params.batch_id}).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted() {
            ApiService.get(`admin/weeks/all/${this.$route.params.batch_id}`).then((res) => {
                this.weeks = res.data.data
                console.log(this.weeks);
            }).catch((res) => {
                console.log(res);
            })
        },
    }
</script>

<style scoped>

</style>