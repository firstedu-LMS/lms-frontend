<template>
    <div class="p-4">
        <h1 v-if="career" class="px-4 font-black">Edit {{ career.name }}</h1>
        <form @submit.prevent="editCareer" class="flex flex-wrap justify-between p-4">
            <div class="w-[27%] my-8">
                <label for="name">Name</label>
                <input v-model="career.name" type="text" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label for="vacancy">Vacancy</label>
                <input v-model="career.vacancy" type="number" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label for="age">Age</label>
                <input v-model="career.age" type="number" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label for="status">Employment Status</label>
                <select v-model="career.employment_status" class="w-full px-2 py-1.5 bg-transparent border-b outline-none">
                    <option disabled selected></option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
            </div>
            <div class="w-[27%] my-8">
                <label for="position">Position</label>
                <input v-model="career.position" type="text" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label for="salary">Salary</label>
                <input v-model="career.salary" type="number" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label for="salary">Salary Period</label>
                <select v-model="career.salary_period" class="w-full px-2 py-1.5 bg-transparent border-b outline-none">
                    <option disabled selected></option>
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>
            <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
            </div>
            <div class="w-[27%] my-8">
                <label for="deadline">Deadline</label>
                <input  v-model="career.deadline" type="date" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-full my-8">
                <label for="description">Job Description</label>
                <quill-editor v-model:content="career.job_description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="w-full my-24">
                <label for="description">Job Requirement</label>
                <quill-editor v-model:content="career.job_requirement" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="flex justify-end w-full my-2">
                <button :disabled="loading" class="px-3 py-1 text-white bg-blue-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
    export default {
        props : ['id'],
        components: {
            QuillEditor
        },
        data(){
            return {
                loading : false,
                career : {}
            }
        },

        methods : {
            editCareer(){
                this.loading = true
                ApiService.put(`admin/careers/${this.id}` , this.career).then(() => {
                    this.loading = false
                    this.$emit('reload')
                }).catch((res) => {
                    this.loading = false
                    alert('Error!')
                    console.log(res);
                })
            }
        },

        mounted(){
            this.loading = true
            ApiService.get(`admin/careers/${this.id}`).then((res) => {
                this.career = res.data.data;
                this.loading = false
            }).catch((res) => {
                this.loading = false
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>