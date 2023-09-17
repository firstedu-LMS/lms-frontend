<template>
    <div class="p-4">
        <h1 class="px-4 font-black">NEW</h1>
        <transition name="dialog">
                <dialog v-if="created" class="fixed z-50 flex flex-col items-center p-6 text-gray" style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
                    <span style="color: #22c55e; font-size: 6rem;" class="material-icons-sharp">check_circle</span>
                    <p class="my-6 text-xl">Course Has Been Created Successfully.</p>
                    <button class="w-full py-1.5 text-white rounded hover:bg-transparent hover:text-green border border-green bg-green" @click="reload">Okay</button>
                </dialog>
        </transition>
        <form :class="created ? 'blur-[1px]' : ''" class="z-30 flex flex-wrap justify-around" @submit.prevent="createCourse" >
                <div class="w-[30%] my-8">
                    <label class="text-[12px] font-semibold" for="name">Name</label>
                    <input v-model="course.name" type="text" class="px-2 w-[60%] mx-5 py-1 border-b outline-none">
                    <p v-if="errors.name" class="py-1 mx-12 text-red">{{ errors.name[0] }}</p>
                </div>
                <div class="w-[30%] my-8">
                    <label class="text-[12px] font-semibold" for="fee">Fee</label>
                    <input v-model="course.fee" type="number" class=" w-[60%] mx-5 px-2 py-1 border-b outline-none">
                    <p v-if="errors.fee" class="py-1 mx-12 text-red">{{ errors.fee[0] }}</p>

                </div>
            <div class="w-[30%] flex justify-center my-8">
                <span class="mr-4 text-center">
                    <input type="radio" class="" v-model="course.available" value="true" />
                    <br><label>open now</label>     
                </span>
                <span class="ml-4 text-center">
                    <input disabled type="radio" class="" v-model="course.available" value="false" />
                    <br><label>temporary closed</label>
                </span>
            </div>
            <div class="w-[30%] my-8">
                <label for="image">Image</label>
                <input @change="saveImage" type="file" class="w-full px-2 py-1 border-b outline-none file:border-0 file:text-sm">
                <p v-if="errors.image_id" class="py-1 mx-12 text-red">{{ errors.image_id[0] }}</p>

            </div>
            <div class="w-[30%] my-8">
                <label class="text-[12px] font-semibold" for="age">Age</label>
                <input v-model="course.age" type="text" class=" w-[60%] mx-5 px-2 py-1 border-b outline-none">
                <p v-if="errors.age" class="py-1 mx-12 text-red">{{ errors.age[0] }}</p>

            </div>
            <div class="w-[30%] my-8">
                <label for="status" class="text-[12px] font-semibold">Status</label>
                <select v-model="course.status" class=" w-3/5 mx-5 px-2 py-1.5 bg-transparent border-b outline-none">
                    <option class="text-[12px]" disabled selected></option>
                    <option class="text-[10px]" value="online">online</option>
                    <option class="text-[10px]" value="offline">offline</option>
                </select>
                <p v-if="errors.status" class="py-1 mx-12 text-red">{{ errors.status[0] }}</p>

            </div>
            <div class="w-[90%] mt-8 mb-32">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="w-full shadow-md shadow-black" v-model:content="course.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
                <p v-if="errors.description" class="py-1 mx-12 text-red">{{ errors.description[0] }}</p>

            </div>

            <div class="flex w-full my-2">
                <button class="px-3 py-1 bg-white shadow-lg text-gray">Submit</button>
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
                created : false,
                course : {
                    name : '',
                    age : '',
                    fee : null,
                    available : true,
                    status : '',
                    description : '',
                    image_id : null
                },
                errors : {}
            }
        },

        methods : {
            reload() {
                this.$emit('reload');
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

            createCourse() {
                if (this.course.available == 'true') {
                    this.course.available = true;
                } else {
                    this.course.available = false;
                }
                ApiService.post('admin/courses' , this.course).then(() => {
                    this.created = true;
                }).catch((res) => {
                    this.errors = res.response.data.errors
                    setTimeout(() => {
                        this.errors = {}
                    },5000)
                })
            }
        }
    }
</script>

<style  scoped>
.dialog-enter-from , .dialog-leave-to {
  transform: scale(90%)
}
.dialog-enter-active , .dialog-leave-active {
  transition: all 0.2s ease-out;
}
</style>