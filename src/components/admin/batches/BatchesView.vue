<template>
    <div>
        <vue-good-table
         :columns="columns"
         :rows="batches"
         :search-options="{enabled: false}"
        >
        <template #table-column="props">
            <span class="text-sm">{{ props.column.label }}</span>
        </template>
            <template #table-row="props">
                <span class="relative flex justify-center w-full text-xs text-center" v-if="props.column.field == 'actions'">
                    <router-link :to="{name : 'AdminWeekPage' , params : {course_id : this.course_id , batch_id : props.row.id}}" class="mx-3 hover:text-blue-2">
                        weeks
                        <span style="color: green;display: block;" class="material-icons-sharp">calendar_today</span>
                    </router-link>
                    <button @click="emitIdForEdit(props.row.id)" class="mx-3 hover:text-blue-2">
                        edit
                        <span style="color: goldenrod;display: block;" class="material-icons-sharp">tune</span>
                    </button>
                    <button :class="props.row.deleted_at ? 'cursor-not-allowed' : '' "  @click="deleteBatch(props.row.id)" class="mx-3 hover:text-red">
                        delete
                        <span style="color: red;display: block;" class="material-icons-sharp">delete</span>
                    </button>
                </span>

                <span v-if="props.column.field == 'status'">
                    <span v-if="props.row.status" class="text-green">Ongoing</span>
                    <span v-else class="text-red">Finished</span>
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
                course_id : this.$route.params.course_id,
                batches : [],
                columns : [
                    {
                        label : 'Batch',
                        field : 'name'
                    },
                    {
                        label : 'Instructor',
                        field : 'instructor.user.name'
                    },
                    {
                        label : 'Start-Date',
                        field : 'start_date'
                    },
                    {
                        label : 'End-Date',
                        field : 'end_date'
                    },
                    {
                        label : 'Start-Time',
                        field : 'start_time'
                    },
                    {
                        label : 'End-Time',
                        field : 'end_time'
                    },
                    {
                        label : 'Status',
                        field : 'status'
                    },
                    {
                        label : 'Actions',
                        field : 'actions'
                    },
                ]
            }
        },

        methods : {
            getBatches () {
                ApiService.get(`admin/batches/all/${this.course_id}`).then((res) => {
                    this.batches = res.data.data
                    this.$emit('course' , this.batches[0].course)
                }).catch((res) => {
                    console.log(res);
                })

            },
            deleteBatch(id){
                ApiService.delete(`admin/batches/${id}`).then(() => {
                    this.getBatches();
                }).catch((res) => {
                    console.log(res);
                })
            },
            emitIdForEdit(id) {
                this.$emit('edit' , id)
            }
        },

        mounted(){
            this.getBatches()
        }
    }
</script>

<style scoped>
thead{
    color: blue;
}
</style>