<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-2 text-xl font-bold text-gray">Courses</h1>
            <div class="my-auto mr-6">
                <button @click="addWeek" class="px-4 py-1 bg-indigo">New +</button>
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

                <span v-if="props.column.field == 'actions'">
                    <button @click="navigateLesson(props.row)">Lessons</button>
                    <button @click="deleteWeek(props.row.id)">Delete</button>
                </span>

                <span class="text-sm" v-else>{{props.formattedRow[props.column.field]}}</span>

            </template>

        </vue-good-table>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import { useLessonStore } from '@/stores/lesson'
import { VueGoodTable } from 'vue-good-table-next'
    export default {
        components : {
            VueGoodTable
        },
        data() {
            return {
                lessonStore : useLessonStore(),
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
            navigateLesson(week){
                this.lessonStore.setWeek(week);
                this.$router.push({name : 'AdminLessonPage' , params : {id : week.id}})
            },
            addWeek(){
                ApiService.post(`admin/weeks`,{"course_id" : 1 , "batch_id" : 1}).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted() {
            ApiService.get(`admin/weeks/all/${this.$route.params.id}`).then((res) => {
                this.weeks = res.data.data
            }).catch((res) => {
                console.log(res);
            })
        },
    }
</script>

<style scoped>

</style>