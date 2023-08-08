<template>
    <div class="relative">
        <vue-good-table 
        :columns="columns" 
        :rows="careers"
        :search-options="{enabled: true}"
        :select-options="{ enabled: true , selectOnCheckboxOnly: true, }"
        v-on:selected-rows-change="selectionChanged"
        >
        <template #selected-row-actions>
            <button class="px-2 py-1 m-1 text-white bg-red">Action 1</button>
        </template>
            <template #table-row="props">
                <span class="relative block w-full text-center" v-if="props.column.field == 'actions'">
                    <span @click="showCareerDialog(props.row)"  class="material-icons-outlined" style="padding: 0px 2rem;cursor: pointer;">more_horiz</span>
                    <div v-if="careerDialog.id == props.row.id" class="absolute text-sm px-1 text-white top-[-4rem] left-[-6rem] bg-gray">
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
                
            </template>
        </vue-good-table>
    </div>
</template>

<script>

import { VueGoodTable } from 'vue-good-table-next'
import axios from 'axios'
    export default {
        components : {
            VueGoodTable
        },
        data() {
            return {
                careers : [],
                careerDialog : {},
                columns : [
                    {
                        label : 'Name',
                        field : 'name'
                    },
                    {
                        label : 'Vacancy',
                        field : 'vacancy'
                    },   

                    {
                        label : 'Age',
                        field : 'id'
                    },
                    {
                        label : 'Employment Status',
                        field : 'employment_status'
                    },
                    {
                        label : 'Salary',
                        field : 'salary'
                    },
                    {
                        label : 'Salary Period',
                        field : 'salary_period'
                    },
                    {
                        label : 'Position',
                        field : 'position'
                    },
                    {
                        label : 'Publish on',
                        field : 'created_at'
                    },
                    {
                        label : 'Deadline',
                        field : 'deadline'
                    },
                    {
                        label : '',
                        field : 'actions'
                    }
                ]
            }
        },
        methods: {
            selectionChanged(e){
                console.log(e.selectedRows);
            },
            showCareerDialog(career){
                if (this.careerDialog.id == career.id) {
                    this.careerDialog = {};
                } else {
                    this.careerDialog = career
                }
            },
        },
        mounted() {
            axios.get('admin/careers').then((res) =>{
                this.careers = res.data.data
            }).catch((res) => {
                console.log(res)
            })
            
        },
    }
</script>

<style lang="scss" scoped>

</style>