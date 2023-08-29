<template>
    <div class="p-4">
        <h1 class="px-4 font-black">NEW</h1>
        <transition name="dialog">
                <dialog v-if="created" class="fixed z-50 flex flex-col items-center p-6 text-gray" style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
                    <span style="color: #22c55e; font-size: 6rem;" class="material-icons-sharp">check_circle</span>
                    <p class="my-6 text-xl">Job Has Been Created Successfully.</p>
                    <button class="w-full py-1.5 text-white rounded hover:bg-transparent hover:text-green border border-green bg-green" @click="reload">Okay</button>
                </dialog>
        </transition>
        <form @submit.prevent="createCareer" class="flex flex-wrap justify-between p-4">
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="name">Name</label>
                <input v-model="career.name" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
                <p v-if="errors.name" class="text-red py-1 mx-8">{{ errors.name[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="vacancy">Vacancy</label>
                <input v-model="career.vacancy" type="number" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
                <p v-if="errors.vacancy" class="text-red py-1 mx-4">{{ errors.vacancy[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="age">Age</label>
                <input v-model="career.age" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
                <p v-if="errors.age" class="text-red py-1 mx-4">{{ errors.age[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="status">Employment Status</label>
                <select v-model="career.employment_status" class="w-full px-2 py-1.5 text-[12px] font-semibold bg-transparent border-b outline-none">
                    <option  disabled selected></option>
                    <option class="text-[11px] " value="Full Time">Full Time</option>
                    <option class="text-[11px] " value="Part Time">Part Time</option>
                </select>
                <p v-if="errors.employment_status" class="text-red py-1">{{ errors.employment_status[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="position">Position</label>
                <input v-model="career.position" type="text" class="w-full px-2 py-1 border-b outline-none">
                <p v-if="errors.position" class="text-red py-1 mx-4">{{ errors.position[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="salary">Salary</label>
                <input v-model="career.salary" type="text" class="w-full px-2 py-1 border-b outline-none">
                <p v-if="errors.salary" class="text-red py-1 mx-4">{{ errors.salary[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="salary">Salary Period</label>
                <select v-model="career.salary_period" class="w-full text-[12px] font-semibold px-2 py-1.5 bg-transparent border-b outline-none">
                    <option  disabled selected></option>
                    <option class="text-[11px]" value="Daily">Daily</option>
                    <option class="text-[11px]" value="Monthly">Monthly</option>
                    <option class="text-[11px]" value="Yearly">Yearly</option>
                </select>
                <p v-if="errors.salary_period" class="text-red py-1 ">{{ errors.salary_period[0] }}</p>

            </div>
            <div class="w-[27%] my-8">
                <label class="text-[12px] font-semibold" for="deadline">Deadline</label>
                <input  v-model="career.deadline" type="date" class="w-full px-2 py-1 border-b outline-none">
                <p v-if="errors.deadline" class="text-red py-1 mx-4">{{ errors.deadline[0] }}</p>

            </div>
            <div class="w-full my-8">
                <label class="text-[12px] font-semibold" for="description">Job Description</label>
                <quill-editor v-model:content="career.job_description" theme="snow" toolbar="full" contentType="html"></quill-editor>
                <p v-if="errors.job_description" class="text-red py-1 mx-12">{{ errors.job_description[0] }}</p>

            </div>
            <div class="w-full my-28">
                <label class="text-[12px] font-semibold" for="description">Job Requirement</label>
                <quill-editor v-model:content="career.job_requirement" theme="snow" toolbar="full" contentType="html"></quill-editor>
                <p v-if="errors.job_requirement" class="text-red py-1 mx-12">{{ errors.job_requirement[0] }}</p>

            </div>
            <div class="w-full my-4">
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
                created : false,
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
                },
                errors : {}
            }
        },

        methods : {
            reload() {
                window.location.reload();
            },
            createCareer(){
                ApiService.post('admin/careers' , this.career).then(() => {
                    this.created = true;
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
.dialog-enter-from , .dialog-leave-to {
  transform: scale(90%)
}
.dialog-enter-active , .dialog-leave-active {
  transition: all 0.2s ease-out;
}
</style>