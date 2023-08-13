<template>
    <div class="p-4">
        <h1 class="px-4 font-black">NEW</h1>
        <form class="flex justify-around flex-wrap" @submit.prevent="createCourse" >
                <div class="w-[30%] my-8">
                    <label for="name">Name</label>
                    <input v-model="course.name" type="text" class="w-full px-2 py-1 border-b outline-none">
                </div>
                <div class="w-[30%] my-8">
                    <label for="fee">Fee</label>
                    <input v-model="course.fee" type="number" class="w-full px-2 py-1 border-b outline-none">
                </div>
            <div class="w-[30%] flex justify-center my-8">
                <span class="text-center mr-4">
                    <input type="radio" class="" v-model="course.available" value="true" />
                    <br><label>open now</label>     
                </span>
                <span class="text-center ml-4">
                    <input type="radio" class="" v-model="course.available" value="false" />
                    <br><label>temporary closed</label>
                </span>
            </div>
            <div class="w-[30%] my-8">
                <label for="image">Image</label>
                <input @change="saveImage" type="file" class="w-full file:border-0 file:text-sm px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[30%] my-8">
                <label for="age">Age</label>
                <input v-model="course.age" type="text" class="w-full px-2 py-1 border-b outline-none">
            </div>
            <div class="w-[30%] my-8">
                <label for="status">Status</label>
                <select v-model="course.status" class="w-full px-2 py-1.5 bg-transparent border-b outline-none">
                    <option disabled selected></option>
                    <option value="online">online</option>
                    <option value="offline">offline</option>
                </select>
            </div>

            <div class="w-full mt-8 mb-32">
                <label for="description">Description</label>
                <quill-editor v-model:content="course.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>

            <div class="flex justify-end w-full my-2">
                <button class="px-3 py-1 text-white bg-blue-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ApiService from '@/services/ApiService';
    export default {
        components : {
            QuillEditor
        },

        data() {
            return {
                course : {
                    name : '',
                    age : '',
                    fee : null,
                    available : '',
                    status : '',
                    description : '',
                    image_id : null
                }
            }
        },

        methods : {
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

            createCourse() {
                ApiService.post('admin/courses' , this.course).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>