<template>
    <div>
        <form @submit.prevent="editBatch" class="flex flex-wrap justify-around w-2/3 text-sm font-semibold">
            
            <div class="w-1/2 p-4 my-4">
                <label for="instructor">Instructor</label>
                <select  class="w-[60%] px-2 ml-2 bg-transparent border-b outline-none" v-model="batch.instructor_id">
                    <option disabled selected></option>
                    <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">{{ instructor.user.name }}</option>
                </select>
            </div>

            <div class="flex w-1/2 p-4 my-4">
                <span class="mr-8">Status</span>
                <span class="mr-4 text-center">
                    <input type="radio" class="" v-model="batch.status" :value="Boolean(true)" />
                    <br><label>on going</label>     
                </span>
                <span class="ml-4 text-center">
                    <input type="radio" class="" v-model="batch.status" :value="Boolean(false)" />
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
import ApiService from '@/services/ApiService';

    export default {
        props : {
            batch_id : {
                required : true
            }
        },
        data () {
            return {
                instructors : [],
                batch : {}
            }
        },

        mounted () {
            ApiService.get(`admin/batches/${this.batch_id}`).then((res) => {
                this.batch = res.data.data;
            }).catch((res) => {
                console.log(res);
            });
            ApiService.get('admin/instructors').then((res) => {
                this.instructors = res.data.data.instructors;
            }).catch((res) => {
                console.log(res);
            });
        },

        methods : {
            editBatch(){
                this.batch.course_id = this.$props.course_id;
                ApiService.patch(`admin/batches/${this.batch_id}` , this.batch).then(() => {
                    window.location.reload();
                }).catch((res) => {
                    console.log(res);
                })
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>