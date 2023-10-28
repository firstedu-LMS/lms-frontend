<template>
    <div class="p-4">
        <SuccessDialog :message="`Lesson has been created successfully.`" @reload="reload" v-if="created" />

        <h1 class="font-black">NEW</h1>
        <form class="flex flex-wrap" @submit.prevent="createLesson" >
                <div class="w-full my-6">
                    <label class="text-[12px] font-semibold" for="name">Name</label>
                    <input v-model="lesson.name" type="text" class="px-2 w-[30%] mx-5 py-1 border-b outline-none">
                    <p v-if="errors.name" class="py-1 mx-12 text-red">{{ errors.name[0] }}</p>

                </div>
            <div class="w-full mt-8 mb-28">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="w-full shadow-md shadow-black" v-model:content="lesson.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
                <p v-if="errors.description" class="py-1 mx-12 text-red">{{ errors.description[0] }}</p>

            </div>
            <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
                loading . . .
            </div>
            <div class="w-[30%] my-6">
                <label for="image">Video</label>
                <input @change="saveVideo"  type="file" class="w-full px-4 py-1 border-b outline-none file:border-0 file:text-sm">
                <p v-if="errors.video_id" class="py-1 text-red ">{{ errors.video_id[0] }}</p>
                <p v-if="errors.video" class="py-1 text-red ">{{ errors.video[0] }}</p>

            </div>

            <div class="flex w-full my-2">
                <button :disabled="loading" class="px-3 py-1 text-black bg-white shadow-sm">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import SuccessDialog from '../../dialog/SuccessDialog.vue'
    export default {
        components : {
            QuillEditor , SuccessDialog
        } ,
        data() {
            return {
                loading : false,
                created : false,
                lesson : {
                    name : '',
                    description : '',
                    video_id : null
                },
                errors : {},

            }
        },
        methods : {
            reload () {
                this.$emit('reload');
            },
            saveVideo(e){
                if (e.target.files) {
                    let form = new FormData();
                    form.set('video' , e.target.files[0])
                    this.loading = true
                    ApiService.post('admin/videos' , form).then((res) => {
                        this.loading = false
                        this.lesson.video_id = res.data.data.id
                    }).catch((res) => {
                        console.log(res);
                        this.loading = false
                    setTimeout(() => {
                        this.errors = {}
                    },3000)
                    })
                }
            },
            createLesson() {
                this.lesson.course_id = this.$route.params.course_id;
                this.lesson.batch_id = this.$route.params.batch_id;
                this.lesson.week_id = this.$route.params.week_id;
                this.loading = true
                ApiService.post('admin/lessons' , this.lesson).then(() => {
                    this.created = true;
                    this.loading = false
                }).catch((res) => {
                    console.log(res);
                    this.loading = false
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