<template>
    <div>
        <form @submit.prevent="createBatch" class="flex flex-wrap justify-around w-2/3 text-sm font-semibold">
            
            <div class="w-1/2 p-4 my-4">
                <label for="instructor">Instructor</label>
                <select  class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.instructor_id">
                    <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">{{ instructor.user.name }}</option>
                </select>
            </div>

            <div class="flex w-1/2 p-4 my-4">
                <span class="mr-8">Status</span>
                <span class="mr-4 text-center">
                    <input type="radio" class="" v-model="batch.status" value="true" />
                    <br><label>on going</label>     
                </span>
                <span class="ml-4 text-center">
                    <input type="radio" class="" v-model="batch.status" value="false" />
                    <br><label>finished</label>
                </span>
            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_date">Start Date</label>
                <input type="date" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.start_date">
            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_date">End Date</label>
                <input type="date" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.end_date">
            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_time">Start Time</label>
                <input type="time" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.start_time">
            </div>

            <div class="w-1/2 p-4 my-4">
                <label for="start_time">End Time</label>
                <input type="time" class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.end_time">
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
                    status : ''
                }
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
                if (this.batch.status == 'true') {
                    this.batch.status = true;
                } else {
                    this.batch.status = false;
                }
                this.batch.course_id = this.$props.course_id;
                ApiService.post('admin/batches' , this.batch).then(() => {
                    window.location.reload();
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>