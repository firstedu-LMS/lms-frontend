<template>
    <div class="relative">
        <h1 class="p-2 text-xl font-bold text-gray">Instructors</h1>
        <vue-good-table
         :columns="columns"
         :rows="instructors"
         :search-options="{enabled: false}"
         :select-options="{ enabled: false , selectOnCheckboxOnly: false, }"
         v-on:selected-rows-change="selectionChanged"
         >

            <template #selected-row-actions>
                <button class="px-2 py-1 m-1 text-white bg-red">Action 1</button>
            </template>

            <template #table-column="props">
                <span class="text-sm" v-if="props.column.field == 'instructor_id'">ID</span>
                <span class="text-sm" v-else-if="props.column.field == 'user.name'">name</span>
                <span class="text-sm" v-else-if="props.column.field == 'user.email'">email</span>
                <span v-else class="text-sm">{{ props.column.field }}</span>
            </template>

            <template #table-row="props">
            <span class="relative block w-full text-center" v-if="props.column.field == 'actions'">
                <span @click="showInstructorDialog(props.row)"  class="material-icons-outlined" style="padding: 0px 2rem;cursor: pointer;">more_horiz</span>
                <div v-if="instructorDialog.id == props.row.id" class="absolute text-sm px-1 text-white top-[-4rem] left-[-6rem] bg-gray">
                        <span class="material-icons-sharp" style="display: block;margin: 0px 15px ;">account_circle</span>&nbsp;&nbsp;profile
                        <span class="material-icons-sharp" style="display: block;margin: 0px 15px ;">email</span>&nbsp;&nbsp;send email
                        <span @click="showCv(props.row.cv.cv)" style="cursor: pointer;display: block;margin: 0px 15px ;" class="material-icons-sharp">article</span>&nbsp;&nbsp;show cv
                    <button class="flex items-center w-full px-2 my-2 text-red">
                        <span @click="deleteInstructor(props.row.id)" class="material-icons-sharp">cancel</span>&nbsp;&nbsp;remove
                    </button>
                </div>
            </span>
            <span class="text-[12px] block mx-5" v-else>{{props.formattedRow[props.column.field]}}</span>
            </template>

            <!-- <template #table-actions-bottom>
                <pagination-vue  v-if="paginationData.current_page"  :paginationProp="paginationData" @next="paginate" @previous="paginate" @random="paginate"></pagination-vue>
            </template> -->

        </vue-good-table>
    </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import filePath from '@/services/public/filePath'
import ApiService from '@/services/ApiService'
    export default {
        components : {
            VueGoodTable 
        },
        data() {
            return {
                filePath : filePath,
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
                       
                    },
                    {
                        label : 'Email',
                        field : 'user.email',
                     
                    },
                    {
                        label : 'Phone',
                        field : 'phone',
                     
                    },
                    {
                        label : 'Address',
                        field : 'address',
                       
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
                ApiService.get(`admin/instructors?page=${page}`).then((res) => {
                    this.paginationData = res.data.data.pagination;
                    this.instructors = res.data.data.instructors;
                }).catch((res) => {
                    console.log(res);
                })
            },
            deleteInstructor(id){
                ApiService.delete(`admin/instructors/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            },
            showCv(cv) {
                let path = this.filePath.cvPath(cv)
                console.log(cv);
                window.open(path , '_blank')
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