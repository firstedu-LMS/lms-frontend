<template>
    <div class="p-4">
        <h1 class="px-4 font-black">NEW</h1>
        <transition name="dialog">
            <SuccessDialog :message="`Course has been created successfully.`" @reload="reload" v-if="created" />
        </transition>
        <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
        </div>
        <form id="form" class="z-30 flex flex-wrap justify-between mx-5" @submit.prevent="createCourse" >
                <div class="w-[30%] my-8">
                    <label class="text-sm font-semibold" for="name">Name</label>
                    <input v-model="course.name" type="text" class="w-3/5 px-2 py-1 mx-5 border-b outline-none">
                    <p v-if="errors.name" class="py-1 mx-12 text-red">{{ errors.name[0] }}</p>
                </div>
                <div class="w-[30%] my-8">
                    <label class="text-sm font-semibold" for="fee">Fee</label>
                    <input v-model="course.fee" type="number" class="w-3/5 px-2 py-1 mx-2 border-b outline-none ">
                    <span class="text-sm font-semibold">MMK</span>
                    <p v-if="errors.fee" class="py-1 mx-12 text-red">{{ errors.fee[0] }}</p>
                </div>
            <div class="w-[30%] flex my-10">
                <label for="condition" class="text-sm font-semibold">Condition</label>
                <span class="pr-4 text-center">
                    <input type="radio" checked v-model="course.available" :value="Boolean(true)" />
                    <br><label>open now</label>     
                </span>
                <span class="pl-4 text-center">
                    <input disabled type="radio" v-model="course.available" :value="Boolean(false)" />
                    <br><label>temporary closed</label>
                </span>
            </div>
            <div class="flex w-full">
                <div class="w-[30%] my-8 mx-2">
                <label class="text-sm font-semibold" for="age">Age</label>
                <input v-model="course.age" type="text" class="w-3/5 px-2 py-1 mx-5 border-b outline-none ">
                <p v-if="errors.age" class="py-1 mx-12 text-red">{{ errors.age[0] }}</p>

            </div>
            <div class="w-[30%] my-10 mx-16">
                <label for="status" class="text-sm font-semibold">Status</label>
                <select v-model="course.status" class=" w-3/5 mx-5 px-2 py-1.5 bg-transparent border-b outline-none">
                    <option class="text-sm" disabled selected></option>
                    <option class="text-sm" value="online">online</option>
                    <option class="text-sm" value="offline">offline</option>
                </select>
                <p v-if="errors.status" class="py-1 mx-12 text-red">{{ errors.status[0] }}</p>

            </div>
            </div>
          
            <div class="w-[95%] ml-[10px] mt-8 mb-32">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="w-full shadow-md shadow-black" v-model:content="course.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
                <p v-if="errors.description" class="py-1 mx-12 text-red">{{ errors.description[0] }}</p>
            </div>
            <div class="w-[30%] my-10 mx-5">
                <label for="image" class="text-sm font-bold">Image</label>
                <input @change="saveImage" type="file" class="w-[80%] px-2 py-1 border-b outline-none file:border-0 file:text-sm">
                <p v-if="errors.image_id" class="py-1 mx-10 text-red">{{ errors.image_id[0] }}</p>
            </div>
  
            <div class="w-1/2 my-2">
                <img v-if="previewImage" :src="previewImage" style="height: 150px;"  alt="">
            </div>
            
            <div class="flex w-full my-2">
                <button :disabled="loading" class="px-3 py-1 mx-3 bg-white shadow-lg text-gray">Submit</button>
            </div>


        </form>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ApiService from '@/services/ApiService';
import filePath from '../../../services/public/filePath';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue'
    export default {
        components : {
            QuillEditor,
            SuccessDialog
        },

        data() {
            return {
                loading : false,
                filePath : filePath,
                previewImage : '',
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
                this.$emit('reload' , 'show');
            },
            saveImage(e) {
                let file = e.target.files[0];
                let form = new FormData();
                form.set('course_image' , file);
                ApiService.post('admin/images' , form).then((res) => {
                    this.previewImage = filePath.imagePath(res.data.data.image)
                    this.course.image_id = res.data.data.id;
                }).catch((res) => {
                    console.log(res);
                })
            },

            createCourse() {
                this.course.available = true;
                this.loading = true;
                ApiService.post('admin/courses' , this.course).then(() => {
                    this.created = true;
                    this.loading = false;
                }).catch((res) => {
                    this.course.available = true;
                    this.loading = false;
                    if (res.response && res.response.data.errors) {
                        this.errors = res.response.data.errors
                        console.log(res.response.data.errors);
                            setTimeout(() => {
                                this.errors = {}
                            },5000)
                    }
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