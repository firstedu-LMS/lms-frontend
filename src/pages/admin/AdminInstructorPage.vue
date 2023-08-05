<template>
    <div class="relative">
        <vue-good-table
         :columns="columns"
         :rows="instructors"
         :search-options="{enabled: true}"
         :select-options="{ enabled: true , selectOnCheckboxOnly: true, }"
         v-on:selected-rows-change="selectionChanged"
         >

            <template #selected-row-actions>
                <button class="px-2 py-1 m-1 text-white bg-red">Action 1</button>
            </template>

            <template #table-row="props">
            <span class="relative block w-full text-center" v-if="props.column.field == 'actions'">
                <span @click="showInstructorDialog(props.row)"  class="material-icons-outlined" style="padding: 0px 2rem;cursor: pointer;">more_horiz</span>
                <div v-if="instructorDialog.id == props.row.id" class="absolute text-sm px-1 text-white top-[-4rem] left-[-6rem] bg-gray">
                    <router-link to="/" class="flex items-center w-full px-2 my-2">
                        <span class="material-icons-sharp">account_circle</span>&nbsp;&nbsp;profile
                    </router-link>
                    <router-link to="/" class="flex items-center w-full px-2 my-2">
                        <span class="material-icons-sharp">email</span>&nbsp;&nbsp;send email
                    </router-link>
                    <router-link to="/" class="flex items-center w-full px-2 my-2">
                        <span class="material-icons-sharp">article</span>&nbsp;&nbsp;show cv
                    </router-link>
                    <button class="flex items-center w-full px-2 my-2 hover:text-red">
                        <span class="material-icons-sharp">cancel</span>&nbsp;&nbsp;remove
                    </button>
                </div>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
            </template>

            <template #table-actions-bottom>
                <pagination-vue  v-if="paginationData.current_page"  :paginationProp="paginationData" @next="paginate" @previous="paginate" @random="paginate"></pagination-vue>
            </template>

        </vue-good-table>
    </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import PaginationVue from '@/components/admin/PaginationVue.vue'
import axios from 'axios'
    export default {
        components : {
            VueGoodTable , PaginationVue
        },
        data() {
            return {
                instructors : [],
                filteredRows : [],
                paginationData : {},
                instructorDialog : {},
                columns : [
                    {
                        label : 'Id',
                        field : 'instructor_id',
                    },
                    {
                        label : 'Name',
                        field : 'user.name',
                        filterOptions : {
                            enabled : true,
                            placeholder: 'Filter by Name',
                        }
                    },
                    {
                        label : 'Email',
                        field : 'user.email',
                        filterOptions : {
                            enabled : true,
                            placeholder: 'Filter by Email',
                        }
                    },
                    {
                        label : 'Phone',
                        field : 'phone',
                        filterOptions : {
                            enabled : true,
                            placeholder: 'Filter by Phone No.',
                        }
                    },
                    {
                        label : 'Address',
                        field : 'address',
                        filterOptions : {
                            enabled : true,
                            placeholder: 'Filter by Address',
                        }
                    },
                    {
                        label : '',
                        field : 'actions'
                    }
                ]
            }
        },
        
        methods : {
            getInstructors(page){
                axios.get(`admin/instructors?page=${page}`).then((res) => {
                    this.paginationData = res.data.data.pagination;
                    this.instructors = res.data.data.instructors;
                }).catch((res) => {
                    console.log(res);
                })
            },

            showInstructorDialog(instructor){
                if (this.instructorDialog.id == instructor.id) {
                    this.instructorDialog = {};
                } else {
                    this.instructorDialog = instructor
                }
            },

            paginate(page){
                this.getInstructors(page)
            },

            // rowSearchFunction(row, col, cell, searchTerm){
            //     if (cell.toLowerCase().includes(searchTerm.toLowerCase())) {
            //         console.warn('matched' , row)
            //     }
            // },
            // columnFilterFn(data , string){
            //     console.log('data' , data);
            //     console.log('string' , string);
            // },
           
            selectionChanged(e){
                console.log(e.selectedRows);
            }
        },

        mounted() {
            this.getInstructors()
        },
    }
</script>

<style scoped>

</style>