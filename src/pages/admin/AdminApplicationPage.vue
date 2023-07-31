<template>
<div class="relative">

    <h1 class="p-2 text-xl font-bold">Application Forms</h1>
    <vue-good-table :columns="columns" :rows="applications" :search-options="{enabled: true,}">
        <template #table-row="props">
            <span v-if="props.column.field == 'actions'">
                <span class="material-icons-sharp" style="cursor: pointer; margin: 0px 15px ;color: rgb(68, 142, 240);">email</span>
                <span @click="toggleForm(props.row)" class="material-icons-sharp" style="cursor: pointer; margin: 0px 15px ;color: rgb(37, 211, 37);">task_alt</span>
                <span @click="deleteApplication(props.row.id)" class="material-icons-sharp" style="cursor: pointer; margin: 0px 15px ;color: red;">cancel</span>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
    </vue-good-table>

    <AcceptInstructorFrom @close="acceptForm = false" v-if="acceptForm" :instructor="acceptInstructorProps"  class="fixed w-1/3 top-1/4 left-1/3" />

  </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import AcceptInstructorFrom from '@/components/admin/AcceptInstructorFrom.vue';
import axios from 'axios';
    export default {
        components: {
            VueGoodTable,AcceptInstructorFrom
        },
        data(){
            return {
                applications : [],
                acceptForm : false,
                acceptInstructorProps : {},
                columns : [
                    {
                        label : 'Career',
                        field : 'career'
                    },
                    {
                        label : 'Email',
                        field : 'email'
                    },
                    {
                        label : 'Applied Date',
                        field : 'created_at'
                    },
                    {
                        label : '',
                        field : 'actions'
                    }
                ]
            }
        },
        methods : {
            toggleForm(data){
                this.acceptInstructorProps = data
                this.acceptForm = !this.acceptForm;
            },
            deleteApplication(id) {
                axios.delete(`admin/applications/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    alert('ERROR !');
                    console.log(res);
                })
            }
        },
        mounted () {
            axios.get('admin/applications').then((res) => {
                    this.applications = res.data.data;
                }).catch((res) => {
                    console.log(res);
                })
        }
    }
</script>

<style  scoped>

</style>