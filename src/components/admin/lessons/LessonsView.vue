<template>
    <div class="relative">
        <vue-good-table
         :columns="columns"
         :rows="lessons"
         :search-options="{enabled: true}">

            <template #table-column="props">
                <span class="text-sm">{{ props.column.field }}</span>
            </template>

            <template #table-row="props">
                <span class="relative flex text-sm text-center" v-if="props.column.field == 'actions'">
                    <button @click="showDetails(props.row.id)" class="px-3 text-sm rounded-lg py-0.5 mx-2 text-white bg-indigo flex items-center" >
                        Details<span style="font-size: 0.8rem;margin-left:4px;" class="material-icons-sharp">check_circle</span>
                    </button>
                    <button class="px-3 text-sm rounded-lg py-0.5 mx-2 text-white bg-red flex items-center" @click="deleteLesson(props.row.id)">
                        Delete<span style="font-size: 0.8rem;margin-left:4px;"  class="material-icons-sharp">cancel</span>
                    </button>
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
            parameters : this.$route.params,
            lessons : [],
            columns : [
                {
                    label : 'Lesson',
                    field : 'name'
                },
                {
                    label : 'actions',
                    field : 'actions'
                }
            ]
           } 
        },
        methods : {
            showDetails(id) {
                this.$emit('showDetails' , id)
            },
            deleteLesson(id) {
                ApiService.delete(`admin/lessons/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted() {
            ApiService.get(`admin/lessons/all/${this.parameters.week_id}`).then((res) => {
                this.lessons = res.data.data;
                if (this.lessons.length) {
                    let heading = {
                    'course' : this.lessons[0].course.name,
                    'batch' : this.lessons[0].batch.name,
                    'week' : this.lessons[0].week.week_number
                }
                this.$emit('setHeading' , heading)
                }
            }).catch((res) => {
                console.log(res);
            })
        }

    }
</script>

<style lang="scss" scoped>

</style>