<template>
    <div class="p-4">
        <h1 class="px-4 font-black" v-if="course">{{ course.name }}</h1>
        <form class="flex flex-wrap justify-around" @submit.prevent="editCourse" >
                <div class="w-[30%] my-8">
                    <label class="text-[12px] font-semibold" for="name">Name</label>
                    <input v-model="course.name" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
                </div>
                <div class="w-[30%] my-8">
                    <label class="text-[12px] font-semibold" for="fee">Fee</label>
                    <input v-model="course.fee" type="number" class=" w-[60%] mx-5 px-2 py-1 border-b outline-none">
                </div>

            <div class="w-[30%] my-8">
                <label class="text-[12px] font-semibold" for="image">Image</label>
                <input @change="saveImage" type="file" class=" w-[60%] mx-5 file:border-0 file:text-sm px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[30%] my-8">
                <label class="text-[12px] font-semibold" for="age">Age</label>
                <input v-model="course.age" type="text" class=" w-[60%] mx-5 px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[30%] my-8">
                <label for="status" class="text-[12px] font-semibold">Status</label>
                <select v-model="course.status" class=" w-[60%] mx-5 px-2 py-1.5 bg-transparent border-b outline-none">
                    <option class="text-[12px]" disabled selected></option>
                    <option class="text-[10px]" value="online">online</option>
                    <option class="text-[10px]" value="offline">offline</option>
                </select>
            </div>
            <div class="w-[30%] flex justify-center my-8">
                <label class="text-[12px] font-semibold">Condition</label>
                <span class="mx-2 text-center">
                    <input type="radio" class="" v-model="course.available" :value="Boolean(true)" />
                    <br><label class="text-[9px]">open now</label>     
                </span>
                <span class="mx-2 text-center">
                    <input type="radio" class="" v-model="course.available" :value="Boolean(false)" />
                    <br><label class="text-[9px]">temporary closed</label>
                </span>
            </div>

            <div class="w-full mt-8 mb-32">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="shadow-md shadow-black w-[90%]" v-model:content="course.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>

            <div class="flex w-full my-2">
                <button class="px-3 py-1 text-black bg-white shadow-sm">Submit</button>
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
                course : {}
            }
        },

        methods : {
            editCourse(){
                ApiService.patch(`admin/courses/${this.id}` , this.course).then(() => {
                    this.$emit('reload');
                }).catch((res) => {
                    alert('Error!')
                    console.log(res);
                })
            },
            saveImage(e) {
                let file = e.target.files[0];
                let form = new FormData();
                form.set('course_image' , file);
                ApiService.post('admin/images' , form).then((res) => {
                    this.course.image_id = res.data.data.id;
                }).catch((res) => {
                    console.log(res);
                })
            },

        },

        mounted(){
            ApiService.get(`admin/courses/${this.id}`).then((res) => {
                this.course = res.data.data;
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>