<template>
    <div>
        <h1 class="text-xl font-bold my-2 mx-2">Enrollments</h1>
        <vue-good-table
         :columns="columns"
         :rows="enrollments"
         :search-options="{enabled: true}"
         :select-options="{ enabled: true , selectOnCheckboxOnly: true, }"
         v-on:selected-rows-change="selectionChanged"
         >
         <template #table-row="props">
                <span class="relative flex justify-around w-full text-center text-white " v-if="props.column.field == 'actions'">
                        <button @click="acceptStudent = !acceptStudent" class="text-sm rounded-sm text-green">
                            Accept
                            <span class="material-icons-outlined text-white" style="font-size: 15px; padding: 3%; background-color :rgb(54, 253, 54); border-radius: 100%;">
                                done
                            </span>
                        </button>
                        <button  class="text-sm rounded-sm text-red">
                            remove
                            <span class="material-icons-outlined text-white" style="font-size: 15px; padding: 3%; background-color :red; border-radius: 100%;">
                                clear
                            </span>
                        </button>
                </span>
            </template>
        </vue-good-table>
        <AcceptStudentEnrollmentForm v-if="this.acceptStudent"></AcceptStudentEnrollmentForm>
    </div>

</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import ApiService from '@/services/ApiService'

import AcceptStudentEnrollmentForm from '@/components/admin/enrollments/AcceptStudentEnrollmentForm.vue'
    export default {
        components : {
            VueGoodTable,
            AcceptStudentEnrollmentForm
        },
        data () {
            return{
                acceptStudent : false,
                enrollments : [],
                columns : [
                    {
                        label : 'ID',
                        field : 'course.id',
                    },
                    {
                        label : 'course',
                        field : 'course.name',
                    },
                    {
                        label : 'name',
                        field : 'student.user.name',
                    },
                    {
                        label : 'email',
                        field : 'student.user.email',
                    },
                    {
                        label : 'phone',
                        field : 'student.phone',
                    },
                    {
                        label : 'address',
                        field : 'student.address',
                    },
                    {
                        label : 'date of birth',
                        field : 'student.date_of_birth',
                    },
                    {
                        label : 'actions',
                        field : 'actions',
                    },
                ]
            }
        },

        mounted () {
            ApiService.get('/admin/enrollments').then(res => {
                console.log(res.data.data)
                 this.enrollments = res.data.data;
            }).catch(res => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>