<template>
    <div class="p-4">
        <h1 class="px-4 ml-6 font-black" v-if="course">{{ course.name }}</h1>
        <form @submit.prevent="editCourse" >
            <div class="ml-10 flex flex-wrap  justify-between">
                <div class="w-[30%] my-8">
                    <label class="text-sm font-semibold" for="name">Name</label>
                    <input v-model="course.name" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
                </div>
                <div class="w-[30%] my-8">
                    <label class="text-sm font-semibold" for="fee">Fee</label>
                    <input v-model="course.fee" type="number" class=" w-[60%] mx-5 px-2 py-1 border-b outline-none">
                    <span class="text-sm font-semibold">MMK</span>
                </div>
                <div class="w-[30%] flex  my-8">
                    <label class="text-sm font-semibold">Condition</label>
                    <span class="mx-2 text-center pl-2">
                        <input type="radio" class="" v-model="course.available" :value="Boolean(true)" />
                        <br><label class="text-xs">open now</label>     
                    </span>
                    <span class="mx-2 text-center pl-2">
                        <input type="radio" class="" v-model="course.available" :value="Boolean(false)" />
                        <br><label class="text-xs">temporary closed</label>
                    </span>
                </div> 
                <div class="flex w-full">
                    <div class="w-[30%] my-8">
                    <label class="text-sm font-semibold" for="age">Age</label>
                    <input v-model="course.age" type="text" class=" w-[60%] mx-5 px-2 py-1 border-b outline-none">
                </div>               
                <div class="w-[30%] ml-16 px-2 my-8">
                <label for="status" class="text-sm font-semibold">Status</label>
                <select v-model="course.status" class=" w-[60%] mx-5 px-2 py-1.5 bg-transparent border-b outline-none">
                    <option class="text-sm" disabled selected></option>
                    <option class="text-sm" value="online">online</option>
                    <option class="text-sm" value="offline">offline</option>
                </select>
                </div>

                </div>
                <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
                loading . . .
                </div>
                <div class="w-full  mt-8 mb-32">
                <label class="font-semibold text-sm" for="description">Description</label>
                <quill-editor class="shadow-md shadow-black w-full" v-model:content="course.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="w-[40%] my-8">
                    <label class="text-sm font-semibold" for="image">Image</label>
                    <input @change="saveImage" type="file" class=" w-[60%] mx-5 file:border-0 file:text-sm px-2 py-1 border-b outline-none">
                </div>

            </div>
            <div class="w-full my-2">
                <img v-if="previewImage" :src="previewImage" style="height: 300px;" class="ml-10" alt="">
            </div>

            <div class="flex w-full my-2 mx-10">
                <button :disabled="loading" class="px-10 py-1 text-black bg-[#d6d6d6] text-sm font-semibold rounded-lg shadow-xl">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '@/services/public/filePath';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
    export default {
        props : ['id'],
        components: {
            QuillEditor,
        },
        data(){
            return {
                filePath : filePath,
                loading : false,
                course : {}
            }
        },

        methods : {
            editCourse(){
                this.loading = true
                ApiService.patch(`admin/courses/${this.id}` , this.course).then(() => {
                    this.loading = false
                    this.$emit('reload');
                }).catch((res) => {
                    this.loading = false
                    alert('Error!')
                    console.log(res);
                })
            },
            saveImage(e) {
                let file = e.target.files[0];
                let form = new FormData();
                form.set('course_image' , file);
                this.loading = true
                ApiService.post('admin/images' , form).then((res) => {
                    this.loading = false
                    this.course.image_id = res.data.data.id;
                    this.previewImage = filePath.imagePath(res.data.data.image)
                }).catch((res) => {
                    this.loading = false
                    console.log(res);
                })
            },

        },

        async mounted(){
            this.loading = true
            await ApiService.get(`admin/courses/${this.id}`).then((res) => {
                this.course = res.data.data;
                console.log(res.data.data);
                this.previewImage = filePath.imagePath(res.data.data.image.image)
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