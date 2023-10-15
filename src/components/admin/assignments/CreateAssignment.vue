<template>
    <form @submit.prevent="createAssignment" class="flex flex-wrap justify-between p-4 text-sm text-gray">
        <h1 class="w-full mb-6 text-xl font-bold">New</h1>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="title">Title</label>
            <input v-model="assignment.title" type="text" class="w-1/2 px-1 bg-transparent border-b outline-none">
            <p v-if="errors.title" class="text-red py-1 mx-12">{{ errors.title[0] }}</p>

        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">Test Date</label>
            <input v-model="assignment.test_date" type="date" class="w-1/2 px-1 bg-transparent border-b outline-none">
            <p v-if="errors.test_date" class="text-red py-1 mx-12">{{ errors.test_date[0] }}</p>

        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">Test Time</label>
            <input  v-model="assignment.test_time" type="time" class="w-1/2 px-1 bg-transparent border-b outline-none">
            <p v-if="errors.test_time" class="text-red py-1 mx-12">{{ errors.test_time[0] }}</p>

        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">File</label>
            <input @change="saveFile" type="file" class="w-1/2 px-1 border-b outline-none file:bg-transparent file:hidden">
            <p v-if="errors.file_id" class="text-red py-1 mx-12">{{ errors.file_id[0] }}</p>

        </div>
        <div class="w-11/12 mx-auto mb-16">
            <label class="font-semibold" for="test_date">Agenda</label>
            <quill-editor v-model:content="assignment.agenda" class="shadow-sm shadow-black" theme="snow" toolbar="full" contentType="html"></quill-editor>
            <p v-if="errors.agenda" class="text-red py-1 mx-12">{{ errors.agenda[0] }}</p>
  
        </div>
        <div class="w-full mt-16">
            <button class="px-4 py-1 bg-[#eee] rounded shadow-xl">Submit</button>
        </div>
    </form>
</template>

<script>
import ApiService from '@/services/ApiService';
import { QuillEditor } from '@vueup/vue-quill'
    export default {
        components : {
            QuillEditor
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
                errors : {}
            }
        },
        methods : {
            saveFile(e){
                if (e.target.files[0]) {
                    let form = new FormData();
                    form.set('assignment' , e.target.files[0])
                    ApiService.post('admin/files' , form).then((res) => {
                        this.assignment.file_id = res.data.data.id
                    }).catch((res) => {
                        console.log(res);
                    })
                }
            },

            createAssignment() {
                ApiService.post('admin/assignments' , this.assignment).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                    this.errors = res.response.data.errors
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