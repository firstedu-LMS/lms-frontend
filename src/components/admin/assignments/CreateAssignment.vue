<template>
<div>
    <SuccessDialog :message="`Assignment has been created successfully.`" @reload="reload" v-if="created" />
    <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
    </div>
    <form @submit.prevent="createAssignment" class="flex flex-wrap justify-between p-4 text-sm text-gray">
        <h1 class="w-full mb-6 text-xl font-bold">New</h1>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="title">Title</label>
            <input v-model="assignment.title" type="text" class="w-1/2 px-1 bg-transparent border-b outline-none">
            <p v-if="errors.title" class="py-1 mx-12 text-red">{{ errors.title[0] }}</p>
        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">Test Date</label>
            <input v-model="assignment.test_date" type="date" class="w-1/2 px-1 bg-transparent border-b outline-none">
            <p v-if="errors.test_date" class="py-1 mx-12 text-red">{{ errors.test_date[0] }}</p>

        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">Test Time</label>
            <input  v-model="assignment.test_time" type="time" class="w-1/2 px-1 bg-transparent border-b outline-none">
            <p v-if="errors.test_time" class="py-1 mx-12 text-red">{{ errors.test_time[0] }}</p>

        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">File</label>
            <input accept=".pdf" @change="saveFile" type="file" class="w-1/2 px-1 border-b outline-none file:bg-transparent file:hidden ">
            <p v-if="errors.file_id" class="py-1 mx-12 text-red">{{ errors.file_id[0] }}</p>
            <p v-if="errors.assignment" class="py-1 mx-12 text-red">{{ errors.assignment[0] }}</p>

        </div>
        <div class="w-11/12 mx-auto mb-16">
            <label class="font-semibold" for="test_date">Agenda</label>
            <quill-editor v-model:content="assignment.agenda" class="shadow-sm shadow-black" theme="snow" toolbar="full" contentType="html"></quill-editor>
            <p v-if="errors.agenda" class="py-1 mx-12 text-red">{{ errors.agenda[0] }}</p>
  
        </div>
        <div class="w-full mt-16">
            <button :disabled="loading" class="px-4 py-1 bg-[#eee] rounded shadow-xl">Submit</button>
        </div>
    </form>
</div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { QuillEditor } from '@vueup/vue-quill'
import SuccessDialog from '../../dialog/SuccessDialog.vue'

    export default {
        components : {
            QuillEditor , SuccessDialog
        },
        data(){
            return {
                assignment : {
                    title : '',
                    course_id : this.$route.params.course_id,
                    batch_id : this.$route.params.batch_id,
                    test_date : '',
                    test_time : '',
                    agenda : '',
                    file_id : null
                },
                errors : {},
                loading : false,
                created : false
            }
        },
        methods : {
            reload () {
                this.$emit('reload')
            },
            saveFile(e){
                this.loading = true;
                if (e.target.files[0]) {
                    let form = new FormData();
                    form.set('assignment' , e.target.files[0])
                    ApiService.post('admin/files' , form).then((res) => {
                        this.assignment.file_id = res.data.data.id
                        this.loading = false;
                    }).catch((res) => {
                        this.errors = res.response.data.error
                        this.loading = false;
                        setTimeout(() => {
                            this.errors = {}
                        },3000)
                    })
                }
            },

            createAssignment() {
                this.loading = true
                ApiService.post('admin/assignments' , this.assignment).then(() => {
                    this.loading = false
                    this.created = true;
                }).catch((res) => {
                    this.errors = res.response.data.errors
                    this.loading = false
                    setTimeout(() => {
                        this.errors = {}
                    },3000)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>