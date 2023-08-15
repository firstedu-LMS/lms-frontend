<template>
    <div>
        <vue-good-table
         :columns="columns"
         :rows="courses"
         :search-options="{enabled: true}"
         :select-options="{ enabled: true , selectOnCheckboxOnly: true, }"
        >
            <template #table-row="props">
                <span class="relative block w-full text-center " v-if="props.column.field == 'actions'">
                    <div  class="flex justify-around text-sm w-[85%] text-white ">
                        <router-link :to="{name : 'HCD_Page' , params: {id : props.row.id}}" class="flex items-center my-2">
                            <button class="bg-cyan-2 py-1 px-4 text-sm rounded-sm">Batch</button>
                        </router-link>
                        <button @click="editCourse(props.row.id)" class="flex text-sm items-center py-1 rounded-sm bg-cyan-2 px-6 my-2">
                            Edit
                        </button>
                        <button @click="deleteCourse(props.row.id)" class="flex text-sm items-center py-1 rounded-sm bg-red px-4 my-2 text-white">
                            Delete
                        </button>
                    </div>
                </span>
                <span v-if="props.column.field == 'available'">
                    <span v-if="props.row.availabe" class="text-green text-sm">{{props.row}}</span>
                    <span v-else class="text-red text-sm">temporary closed</span>
                </span>
                <span class="text-sm block mx-5" v-else>{{props.formattedRow[props.column.field]}}</span>
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
                    }
                ]
            }
        },
        methods: {
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
                    window.location.reload()
                }).catch((res) => {
                    alert('Error!')
                    console.log(res);
                })
            }
        },
        mounted() {
            ApiService.get('admin/courses').then((res) => {
                this.courses = res.data.data
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res.data.data);
            })
            
        },
    }
</script>

<style lang="scss" scoped>

</style>