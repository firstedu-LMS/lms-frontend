<template>
    <div class="relative">
        <vue-good-table
         :columns="columns"
         :rows="careers"
         :search-options="{enabled: true}"
         :select-options="{ enabled: true , selectOnCheckboxOnly: true, }">

            <template #table-column="props">
                <span class="text-sm">{{ props.column.field }}</span>
            </template>

            <template #table-row="props">
                <span class="relative block w-full text-sm text-center" v-if="props.column.field == 'actions'">
                    <span @click="showCareerDialog(props.row)"  class="material-icons-outlined" style="padding: 0px 2rem;cursor: pointer;">more_horiz</span>
                    <div v-if="careerDialog.id == props.row.id" class="absolute text-sm px-2 text-white top-[-4rem] left-[-6rem] bg-gray">
                        <router-link :to="{name : 'HJD_Page' , params: {id : props.row.id}}" class="flex items-center w-full px-2 my-2">
                            <span class="material-icons-sharp">info</span>&nbsp;&nbsp;Details
                        </router-link>
                        <button @click="editCareer(props.row.id)" class="flex items-center w-full px-2 my-2">
                            <span class="material-icons-sharp">info</span>&nbsp;&nbsp;Edit
                        </button>
                        <button @click="deleteCareer(props.row.id)" class="flex items-center w-full px-2 my-2 text-red">
                            <span class="material-icons-sharp">delete</span>&nbsp;&nbsp;Delete
                        </button>
                    </div>
                </span>

                <span class="text-sm" v-else>{{props.formattedRow[props.column.field]}}</span>

            </template>
        </vue-good-table>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { VueGoodTable } from 'vue-good-table-next';
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
                        label : 'Status',
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
        methods : {
            showCareerDialog(career){
                if (this.careerDialog.id == career.id) {
                    this.careerDialog = {}
                }else {
                    this.careerDialog = career
                }
            },
            editCareer(id){
                this.$emit('edit' , id)
            },
            deleteCareer(id){
                ApiService.delete(`admin/careers/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    alert('Error!')
                    console.log(res);
                })
            }
        },
        mounted() {
            ApiService.get('admin/careers').then((res) => {
                this.careers = res.data.data
            }).catch((res) => {
                console.log(res);
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>