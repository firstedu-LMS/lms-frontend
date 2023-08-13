<template>
    <div>
        <vue-good-table
         :columns="columns"
         :rows="batches"
         :search-options="{enabled: true}"
        >

        </vue-good-table>
    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
    export default {
        props : {
            id : {
                required : true
            }
        },
        components : {
            VueGoodTable
        },
        data() {
            return {
                batches : [],
                columns : [
                    {
                        label : 'Batch',
                        field : 'id'
                    },
                    {
                        label : 'Instructor',
                        field : 'instructor'
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
        }
    }
</script>

<style scoped>

</style>