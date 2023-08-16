<template>
    <div>
        <vue-good-table
         :columns="columns"
         :rows="courses"
         :search-options="{enabled: true}"
         :select-options="{ enabled: true , selectOnCheckboxOnly: true, }"
        >
            <template #table-column="props">
                <span class="text-sm">{{ props.column.field }}</span>
            </template>
            
            <template #table-row="props">
                <span class="relative flex justify-around w-full text-center text-white " v-if="props.column.field == 'actions'">
                        <router-link :to="{name : 'AdminBatchPage' , params: {id : props.row.id}}" class="px-6 py-1 text-sm rounded-sm bg-cyan-2">
                            Batch
                        </router-link>
                        <button @click="editCourse(props.row.id)" class="px-6 py-1 text-sm rounded-sm bg-cyan-2">
                            Edit
                        </button>
                        <button @click="deleteCourse(props.row.id)" class="px-4 py-1 text-sm rounded-sm bg-red">
                            Delete
                        </button>
                </span>
                <span v-if="props.column.field == 'available'">
                    <span v-if="props.row.availabe" class="text-sm text-green">{{props.row}}</span>
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
            }).catch((res) => {
                console.log(res);
            })
            
        },
    }
</script>

<style lang="scss" scoped>

</style>