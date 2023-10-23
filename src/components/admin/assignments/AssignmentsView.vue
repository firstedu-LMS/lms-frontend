<template>
    <div>
        <vue-good-table
         :columns="columns"
         :rows="assignments"
         :search-options="{enabled: false}" >

            <template #table-column="props">
                <span class="text-sm">{{ props.column.label }}</span>
            </template>

            <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                    <span  @click="editAssignment(props.row.id)" style="cursor: pointer;margin: 2px 10px;color: rgb(194, 194, 6);" class="material-icons-outlined">tune</span>
                    <span  @click="deleteAssignment(props.row.id)" style="margin: 2px 10px;color: rgb(243, 31, 31);cursor: pointer;" class="material-icons-outlined">delete</span>
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
        data () {
            return {
                assignments : [],
                columns : [
                    {
                        label : 'Title',
                        field : 'title'
                    },
                    {
                        label : 'Test Date',
                        field : 'test_date'
                    },
                    {
                        label : 'Test Time',
                        field : 'test_time'
                    },
                    {
                        label : 'Actions',
                        field : 'actions'
                    },
                ]
            }
        },
        methods : {
            editAssignment(id) {
                this.$emit('edit' , id)
            },
            deleteAssignment(id){
                ApiService.delete(`admin/assignments/${id}`).then(() => {
                    window.location.reload();
                })
            }
        },
        mounted(){
            ApiService.get('admin/assignments').then((res) => {
                this.assignments = res.data.data;
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>