<template>
    <div>    
        <div class="w-[60%] absolute top-10 mx-32 ">
            <div v-if="selectedStudent && selectedStudent.user" class="bg-gray-3 px-8 my-4 py-6">
                <span @click="closeCompo" class="material-icons-sharp" style="cursor: pointer; float: right; margin-bottom: 15px;">
                    cancel
                </span>
                <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
                    loading . . .
                </div>
                <div class="w-full flex justify-between mt-6">
                    <label class="w-2/6 mx-0.5 text-center py-2 px-2" for="name">Name</label>
                    <p class="w-4/6 bg-white py-2 px-2">{{ selectedStudent.user.name }}</p>
                </div>
                <div class="w-full flex justify-between my-8">
                    <label class="w-2/6 mx-0.5 text-center py-2 px-2 " for="email">Email</label>
                    <p class="w-4/6 bg-white py-2 px-2">{{ selectedStudent.user.email }}</p>
                </div>
                <div class="w-full flex justify-between ">
                    <label class="w-2/6 mx-0.5  text-center py-2 px-2" for="phone">Phone</label>
                    <p class="w-4/6 bg-white py-2 px-2">{{ selectedStudent.phone }}</p>
                </div>
                <div class="w-full flex justify-between my-8">
                    <label class="w-2/6 mx-0.5  text-center py-2 px-2" for="date_of_birth">Date Of Birth</label>
                    <p class="w-4/6 bg-white py-2 px-2">{{ selectedStudent.date_of_birth }}</p>
                </div>
                <div class="w-full flex my-6 ">
                    <label class="w-2/6 mx-0.5  text-center py-2 px-2" for="address">Address</label>
                    <p class="w-4/6 bg-white py-2 px-2">{{ selectedStudent.address }}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <div class="bg-gray-3 py-1 text-center w-4/6">
                    <p>{{ selectedStudent.course_name }}</p>
                </div>
                <div class="w-[25%]">
                    <select @change="selectBatch" class="w-full bg-gray-3 py-2 px-2 outline-none">
                        <option selected disabled value="">Choose Batch</option>
                        <option v-for="batch in batches" :key="batch.id" :value="batch.id">{{ batch.name }}</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-end my-4">
                <button @click="enroll" :disabled="loading" class="bg-green text-white py-1.5 px-8 rounded-md">Accept</button>
            </div>
        </div>
       
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';

    export default {
        props : {
            enrollment : {
                required : true
            },
            student : {
                required : true
            }
        },
        data() {
            return {
                batches : [],
                selectedStudent : {},
                loading : false
            }
        },
        mounted() {
            this.selectedStudent = this.$props.student
            console.log(this.selectedStudent);
            ApiService.get(`admin/batches/all/${this.enrollment.course_id}`).then( res => {
                this.batches = res.data.data;
            }).catch((res) => {
                console.log(res);
            })
        },
        methods : {
            selectBatch(e) {
                this.$emit('selectBatch' , parseInt(e.target.value));
            },
            closeCompo() {
                this.$emit('closeCompo');
            },
            enroll() {
                if (this.enrollment.course_id && this.enrollment.batch_id && this.enrollment.student_id) {
                    this.loading = true
                    ApiService.post('admin/enrollments' , this.enrollment).then(() => {
                        this.$emit('success');
                        this.loading = false

                    }).catch((res) => {
                        console.log(res);
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>