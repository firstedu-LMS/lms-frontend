<template>
    <div>
        <h1 class="text-xl font-bold my-2 mx-2">Enrollments</h1>
        <vue-good-table
         :columns="columns"
         :rows="enrollments"
         :search-options="{enabled: true}"
         >
         <template #table-row="props">
                <span  v-if="props.column.field == 'actions'">
                        <button @click="showForm(props.row)" class="text-sm rounded-sm text-green">
                            Accept
                            <span class="material-icons-outlined" style="font-size: 15px; padding: 3%; background-color :rgb(54, 253, 54); border-radius: 100%;">
                                done
                            </span>
                        </button>
                        <button @click="cancelEnrollment(props.row.id)"  class="text-sm rounded-sm text-red">
                            remove
                            <span class="material-icons-outlined" style="font-size: 15px; padding: 3%; background-color :red; border-radius: 100%;text:white">
                                clear
                            </span>
                        </button>
                </span>
            </template>
        </vue-good-table>
        <AcceptStudentForm @close="acceptForm = false" v-if="acceptForm" :student="acceptStudentProps"></AcceptStudentForm>
    </div>

</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import ApiService from '@/services/ApiService'

import AcceptStudentForm from '@/components/admin/AcceptStudentForm.vue'
    export default {
        components : {
            VueGoodTable,
            AcceptStudentForm
        },
        data () {
            return{
                acceptForm : false,
                acceptStudentProps : {},
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
        methods: {
            showForm(data){
                this.acceptStudentProps = data
                this.acceptForm = !this.acceptForm;
            },

            cancelEnrollment(id) {
                ApiService.delete(`admin/enrollments/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    alert('ERROR !');
                    console.log(res);
                })
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