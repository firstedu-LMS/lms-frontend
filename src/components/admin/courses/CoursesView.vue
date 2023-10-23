<template>
    <div>
        <vue-good-table
         :columns="columns"
         :rows="courses"
         :search-options="{enabled: false}"
         :select-options="{ enabled: false , selectOnCheckboxOnly: false, }"
        >
            <template #table-column="props">
                <span class="text-sm">{{ props.column.field }}</span>
            </template>
            
            <template #table-row="props">
                <span class="relative flex justify-around w-full text-center text-white " v-if="props.column.field == 'actions'">
                        <router-link :to="{name : 'AdminBatchPage' , params : {course_id : props.row.id}}" class="px-6 py-1 text-sm rounded-sm bg-cyan">
                            batch
                        </router-link>
                        <button @click="editCourse(props.row.id)" class="px-6 py-1 text-sm rounded-sm bg-cyan">
                            edit
                        </button>
                        <button @click="deleteCourse(props.row.id)" class="px-4 py-1 text-sm rounded-sm bg-red">
                            delete
                        </button>
                </span>
                <span v-if="props.column.field == 'available'">
                    <span v-if="props.row.available" class="text-sm text-green">open now</span>
                    <span v-else class="text-sm text-red">temporary closed</span>
                </span>
                <span class="text-sm" v-else>{{props.formattedRow[props.column.field]}}</span>
            </template>
        </vue-good-table>       
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { VueGoodTable } from 'vue-good-table-next'
    export default {
        components : {
            VueGoodTable
        },
        data() {
            return {
                courses : [],
                courseDialog : {},
                columns : [
                    {
                        label : 'Name',
                        field : 'name',
                    },
                    {
                        label : 'Fee',
                        field : 'fee',
                    },
                    {
                        label : 'Status',
                        field : 'status',
                    },
                    {
                        label : 'Condition',
                        field : 'available',
                    },
                    {
                        label : 'Actions',
                        field : 'actions',
                        width : '35%'
                    }
                ]
            }
        },
        methods: {
            getCourses(){
                ApiService.get('admin/courses').then((res) => {
                    this.courses = res.data.data
                }).catch((res) => {
                    console.log(res);
                })
            },
            showCourseDialog(course){
                if (this.courseDialog.id == course.id) {
                    this.courseDialog = {}
                }else {
                    this.courseDialog = course
                }
            },
            editCourse(id){
                this.$emit('edit' , id)
            },
            deleteCourse(id){
                ApiService.delete(`admin/courses/${id}`).then(() => {
                    this.getCourses();
                }).catch((res) => {
                    alert('Error!')
                    console.log(res);
                })
            }
        },
        mounted() {
            this.getCourses();
        },
    }
</script>

<style lang="scss" scoped>

</style>