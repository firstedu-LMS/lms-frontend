<template>
    <div>
        <h1 class="text-xl font-bold my-2 mx-2">Enrollments</h1>
        <vue-good-table
         :columns="columns"
         :rows="enrollments"
         >
         <template #table-row="props">
                <span class="relative flex justify-around w-full text-center text-white " v-if="props.column.field == 'actions'">
                        <button @click="acceptStudent(props.row.course.id,props.row.student.id , props.row.student,props.row.course.name)"  class="text-sm rounded-sm text-green">
                            Accept
                            <span class="material-icons-outlined text-white" style="font-size: 15px; padding: 3%; background-color :rgb(54, 253, 54); border-radius: 100%;">
                                done
                            </span>
                        </button>
                        <button @click="cancelEnrollment(props.row.id)"  class="text-sm rounded-sm text-red">
                            remove
                            <span class="material-icons-outlined text-white" style="font-size: 15px; padding: 3%; background-color :red; border-radius: 100%;">
                                clear
                            </span>
                        </button>
                </span>
            </template>
        </vue-good-table>
        <AcceptStudentEnrollmentForm @closeCompo="closeCompo" :student="selectedStudent" @success="reload" :enrollment="enrollment" @selectBatch="batchSelection" v-if="acceptStudentForm"></AcceptStudentEnrollmentForm>
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
                enrollment : {
                    student_id : '',
                    course_id : '',
                    batch_id : ''
                },
                selectedStudent : {},
                acceptStudentForm : false,
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
                        field : 'student.user.email'
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
            this.getEnrollments();
        },
        methods : {
            getEnrollments() {
                ApiService.get('/admin/enrollments').then(res => {
                    this.enrollments = res.data.data;
                }).catch(res => {
                    console.log(res);
                })
            },
            batchSelection(id) {
                this.enrollment.batch_id = id;
            },
            acceptStudent(course_id,student_id , student,course_name){
                this.acceptStudentForm =! this.acceptStudentForm
                this.enrollment.course_id = course_id;
                this.enrollment.student_id = student_id;
                this.selectedStudent = student;
                this.selectedStudent.course_name = course_name 
            },
            reload() {
                this.acceptStudentForm = false;
                this.getEnrollments();
            },
            closeCompo(){
                this.acceptStudentForm = false;
            }
        }
    }
</script>

<style scoped>

</style>