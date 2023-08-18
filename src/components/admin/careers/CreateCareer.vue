<template>
    <div class="p-4">
        <h1 class="px-4 font-black">NEW</h1>
        <form @submit.prevent="createCareer" class="flex flex-wrap justify-between p-4">
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="name">Name</label>
                <input v-model="career.name" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="vacancy">Vacancy</label>
                <input v-model="career.vacancy" type="number" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="age">Age</label>
                <input v-model="career.age" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="status">Employment Status</label>
                <select v-model="career.employment_status" class="w-full px-2 py-1.5 text-[12px] font-semibold bg-transparent border-b outline-none">
                    <option  disabled selected></option>
                    <option class="text-[11px] " value="Full Time">Full Time</option>
                    <option class="text-[11px] " value="Part Time">Part Time</option>
                </select>
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="position">Position</label>
                <input v-model="career.position" type="text" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="salary">Salary</label>
                <input v-model="career.salary" type="text" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="salary">Salary Period</label>
                <select v-model="career.salary_period" class="w-full text-[12px] font-semibold px-2 py-1.5 bg-transparent border-b outline-none">
                    <option  disabled selected></option>
                    <option class="text-[11px]" value="Daily">Daily</option>
                    <option class="text-[11px]" value="Monthly">Monthly</option>
                    <option class="text-[11px]" value="Yearly">Yearly</option>
                </select>
            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="deadline">Deadline</label>
                <input  v-model="career.deadline" type="date" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-full my-8">
                <label class="text-[12px] font-semibold" for="description">Job Description</label>
                <quill-editor v-model:content="career.job_description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="w-full my-24">
                <label class="text-[12px] font-semibold" for="description">Job Requirement</label>
                <quill-editor v-model:content="career.job_requirement" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="w-full my-2">
                <button class="px-3 py-1 text-white bg-blue-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
    export default {
        components: {
            QuillEditor
        },
        data(){
            return {
                career : {
                    name : '',
                    vacancy : null,
                    age : '',
                    position : '',
                    deadline : '',
                    salary : '',
                    salary_period : '',
                    employment_status : '',
                    job_description : '',
                    job_requirement : '',
                }
            }
        },

        methods : {
            createCareer(){
                ApiService.post('admin/careers' , this.career).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    alert('Error!')
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>