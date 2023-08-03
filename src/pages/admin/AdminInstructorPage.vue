<template>
    <div class="relative">
        <vue-good-table :columns="columns" :rows="instructors" :search-options="{enabled: true,}">
            <template  >
            
            </template>
        </vue-good-table>
    </div>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import axios from 'axios'
    export default {
        components : {
            VueGoodTable
        },
        data() {
            return {
                instructors : [],
                columns : [
                    {
                        label : 'Id',
                        field : 'instructor_id'
                    },
                    {
                        label : 'Name',
                        field : 'user.name'
                    },
                    {
                        label : 'Email',
                        field : 'user.email'
                    },
                    {
                        label : 'Phone',
                        field : 'phone'
                    },
                    {
                        label : 'Address',
                        field : 'address'
                    },
                    {
                        label : '',
                        field : 'actions'
                    }
                ]
            }
        },
        mounted() {
            axios.get('admin/instructors').then((res) => {
                this.instructors = res.data.data
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>