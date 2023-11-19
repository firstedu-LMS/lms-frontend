<template>
    <div>
        <SuccessDialog v-if="uploaded" @reload="$router.go(-1)" message="Upload Assignment" />
        <div v-if="assignment.file && assignment.file.file" class="flex justify-between px-1 m-2 sm:m-8 sm:px-6 bg-gray-2">
            <img class="w-12 sm:w-16" src="/images/layout/pdf-svgrepo-com.svg" alt="">
            <p class="hidden my-auto font-bold sm:block">Download Your Assignments Paper</p>
            <a target="_blank" :download="filePath.cvPath(assignment.file.file)" :href="filePath.cvPath(assignment.file.file)" class="px-2 py-1 my-auto font-bold text-black bg-white h-1/2 sm:py-2 sm:px-3">Download PDF</a>
        </div>
        <div class="px-2 sm:px-8">
            <h1 class="text-xl font-bold">{{ assignment.title }}</h1>
            <h1 class="py-4 font-bold">Agenda</h1>
            <p v-html="assignment.agenda"></p>
            <h1 class="pt-8 font-bold">Due Date</h1>
            <p class="py-3 ">{{ assignment.test_date }}//{{ assignment.test_time }}</p>
        </div>
        <div class="px-2 py-1 mx-2 mt-8 font-bold text-center sm:mx-8 bg-gray-2 sm:py-3 sm:px-6 sm:w-1/3">
            <button @click="FileUpload">Upload Your Assignment Paper (pdf file only)</button>
            <input @change="InputFileUpload" class="hidden" ref="Upload" type="file">
        </div>
        <div class="flex">
            <img class="mt-2 ml-2 w-14 sm:ml-8"  src="/images/layout/pdf-svgrepo-com.svg" alt="">
            <p class="mx-3 my-2">{{ this.FileName }}</p>
        </div>
        <button @click="UploadPdf" :disabled="loading" class="px-4 mx-2 my-3 text-white rounded-lg bg-blue-2 sm:mx-8">Upload</button>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '../../services/public/filePath';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';

    export default {
        components : {
            SuccessDialog
        },  
        data () {
            return {
                filePath : filePath,
                id : this.$route.params.id,
                assignment : {},
                submission : {},
                FileName : '',
                loading : true,
                uploaded : false,
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
                this.loading = true;
                this.FileName = e.target.files[0].name;
                let ev = e.target.files[0];
                let fd = new FormData();
                fd.append('submission_file',ev);
                ApiService.post('students/assignment/submission-file' ,fd).then((res) => {
                    this.submission.submission_file_id = res.data.data.id;
                    this.loading = false;
                }).catch((res) => {
                    console.log(res);
                    this.loading = false;
                })
            },
            UploadPdf () {
                this.loading = true;
                this.submission.assignment_id = this.id;
                ApiService.post('students/submissions',this.submission).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.uploaded = true;
                }).catch((res) => {
                    console.log(res);
                    this.loading = false;
                })
            }
        },
    }
</script>

<style  scoped>

</style>
