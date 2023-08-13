<template>
    <div>
        <div class="flex justify-end">
            <span @click="$emit('close')" style="cursor: pointer;" class="material-icons-sharp">cancel</span>
        </div>
        <form @submit.prevent="accept" class="p-4 mx-6 text-white bg-green">
            <h1 class="text-center">To accept as instructor, you must set a password to create instructor profile.</h1>
            <div class="mt-4">
                <label for="name" class="mr-4">Name</label>
                <input v-model="formData.name" class="outline-none w-full text-gray px-2 py-0.5 rounded-sm" type="text">
            </div>
            <div class="mt-4">
                <label for="password" class="mr-4">Password</label>
                <input v-model="formData.password" class="outline-none w-full text-gray px-2 py-0.5 rounded-sm" type="text">
            </div>
            <div class="flex justify-end mt-4">
                <button class="px-2 py-1 rounded-sm bg-blue-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        props : ['instructor'],
        data(){
            return {
                formData : {
                    email : '',
                    cv_id : '',
                    name : '',
                    password : ''
                }
            }
        },
        mounted () {
            this.formData.email = this.instructor.email;
            this.formData.cv_id = this.instructor.cv_id;
            console.log(this.formData);
        },
        methods : {
            accept(){
                axios.post('admin/applications/add-instructor' , this.formData).then(() => {
                    this.$router.push({name : 'AdminInstructorPage'})
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>