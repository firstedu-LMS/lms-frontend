<template>
    <form @submit.prevent="editAssignment" class="flex flex-wrap justify-between p-4 text-sm text-gray">
        <h1 class="w-full mb-6 text-xl font-bold">New</h1>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="title">Title</label>
            <input v-model="assignment.title" type="text" class="w-1/2 px-1 bg-transparent border-b outline-none">
        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">Test Date</label>
            <input v-model="assignment.test_date" type="date" class="w-1/2 px-1 bg-transparent border-b outline-none">
        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">Test Time</label>
            <input  v-model="assignment.test_time" type="time" class="w-1/2 px-1 bg-transparent border-b outline-none">
        </div>
        <div class="w-1/2 mb-16">
            <label class="inline-block font-semibold w-[15%]" for="test_date">File</label>
            <input @change="saveFile" type="file" class="w-1/2 px-1 border-b outline-none file:bg-transparent file:hidden">
        </div>
        <div class="w-11/12 mx-auto mb-16">
            <label class="font-semibold" for="test_date">Agenda</label>
            <quill-editor v-model:content="assignment.agenda" class="shadow-sm shadow-black" theme="snow" toolbar="full" contentType="html"></quill-editor>
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
        props : {
            id : {
                required : true
            }
        },
        data(){
            return {
                assignment : {}
            }
        },
        methods : {
            editAssignment(){
                ApiService.patch(`admin/assignments/${this.id}` , this.assignment).then((res) => {
                    window.location.reload();
                    console.log(res);
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted(){
            ApiService.get(`admin/assignments/${this.id}`).then((res) => {
                this.assignment = res.data.data
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>