<template>
    <div>
        <form @submit.prevent="createBatch" class="flex flex-wrap justify-around w-2/3 text-sm font-semibold">
            
            <div class="w-1/2 p-4 my-4">
                <label for="instructor">Instructor</label>
                <select  class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.instructor_id">
                    <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">{{ instructor.user.name }}</option>
                </select>
                <p v-if="errors.instructor_id" class="py-1 mx-8 text-red">{{ errors.instructor_id[0] }}</p>

            </div>

            <div class="flex w-1/2 p-4 my-4">
                <span class="mr-8">Status</span>
                <span class="mr-4 text-center">
                    <input type="radio" class="" v-model="batch.status" :value="Boolean(true)" />
                    <br><label>on going</label>     
                </span>
                <span class="ml-4 text-center">
                    <input type="radio" disabled class="" v-model="batch.status" :value="Boolean(false)" />
                    <br><label>finished</label>
                </span>
            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_date">Start Date</label>
                <input type="date" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.start_date">
                <p v-if="errors.start_date" class="py-1 mx-12 text-red">{{ errors.start_date[0] }}</p>

            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_date">End Date</label>
                <input type="date" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.end_date">
                <p v-if="errors.end_date" class="py-1 mx-12 text-red">{{ errors.end_date[0] }}</p>

            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_time">Start Time</label>
                <input type="time" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.start_time">
                <p v-if="errors.start_time" class="py-1 mx-4 text-red">{{ errors.start_time[0] }}</p>

            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_time">End Time</label>
                <input type="time" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.end_time">
                <p v-if="errors.end_time" class="py-1 mx-12 text-red">{{ errors.end_time[0] }}</p>

            </div>

            <div class="w-full px-4">
                <button class="px-4 py-1.5 shadow-lg bg-white">Submit</button>
            </div>

        </form>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
    export default {
        props : {
            course_id : {
                required : true
            }
        },
        data(){
            return {
                instructors : [],
                batch : {
                    instructor_id : null,
                    course_id : this.$props.course_id,
                    start_date : '',
                    end_date : '',
                    start_time : '',
                    end_time : '',
                    status : true
                },
                errors : {}
            }
        },
        mounted(){
            ApiService.get('admin/instructors').then((res) => {
                this.instructors = res.data.data.instructors;
            }).catch((res) => {
                console.log(res);
            })
        },
        methods : {
            createBatch(){
                this.batch.course_id = this.$props.course_id;
                ApiService.post('admin/batches' , this.batch).then(() => {
                    this.$emit('reload')
                }).catch((res) => {
                    this.errors = res.response.data.errors
                    setTimeout(() => {
                        this.errors = {}
                    },3000)
                })
            }
        }
    }
</script>

<style scoped>

</style>