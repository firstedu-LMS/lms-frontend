<template>
    <div>
        <div class="flex justify-between sm:m-8 m-2 sm:px-6 px-1 bg-gray-2">
            <img class="sm:w-16 w-12" src="/images/layout/pdf-svgrepo-com.svg" alt="">
            <p class="my-auto font-bold hidden sm:block">Download Your Assignments Paper</p>
            <button class="h-1/2 sm:py-2 py-1 sm:px-3 px-2 my-auto bg-white text-black font-bold">Download PDF</button>
        </div>
        <div class="sm:px-8 px-2">
            <h1 class="font-bold text-xl">{{ assignment.title }}</h1>
            <h1 class="py-4 font-bold">Agenda</h1>
            <p v-html="assignment.agenda"></p>
            <h1 class="pt-8  font-bold">Due Date</h1>
            <p class=" py-3">{{ assignment.test_date }}//{{ assignment.test_time }}</p>
        </div>
        <div class="sm:mx-8 mx-2 mt-8 bg-gray-2 sm:py-3 py-1 font-bold sm:px-6 px-2 sm:w-1/3 text-center">
            <button @click="FileUpload">Upload Your Assignment Paper(pdf file only)</button>
            <input @change="InputFileUpload" class="hidden" ref="Upload" type="file">
        </div>
        <div class="flex">
            <img class="w-14 ml-2 sm:ml-8 mt-2"  src="/images/layout/pdf-svgrepo-com.svg" alt="">
            <p class="my-2 mx-3">{{ this.FileName }}</p>
        </div>
        <button @click="UploadPdf" class="bg-blue-2 sm:mx-8 mx-2 px-4 rounded-lg text-white my-3">Upload</button>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';

    export default {
        data () {
            return {
                id : this.$route.params.id,
                assignment : {},
                submission : {},
                FileName : ''
            }
        },
        mounted () {
            ApiService.get(`students/assignments/${this.id}`).then((res) => {
                this.assignment = res.data.data;
                console.log(res.data.data);
            }).catch((res) => {
                console.log(res);
            })
        },
        methods: {
            FileUpload(){
                this.$refs.Upload.click();
            },
            InputFileUpload(e){
                this.FileName = e.target.files[0].name;
                let ev = e.target.files[0];
                let fd = new FormData();
                fd.append('submission_file',ev);
                ApiService.post('students/files' ,fd).then((res) => {
                    this.submission.submission_file_id = res.data.data.id;
                }).catch((res) => {
                    console.log(res);
                })
            },
            UploadPdf () {
                this.submission.assignment_id = this.id;
                ApiService.post('students/submissions',this.submission).then((res) => {
                    console.log(res);
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
    }
</script>

<style  scoped>

</style>