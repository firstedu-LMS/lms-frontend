<template>
    <div class="p-4">
        <h1 class="font-black">NEW</h1>
        <form class="flex flex-wrap" @submit.prevent="createLesson" >
                <div class="w-full my-6">
                    <label class="text-[12px] font-semibold" for="name">Name</label>
                    <input v-model="lesson.name" type="text" class="px-2 w-[30%] mx-5 py-1 border-b outline-none">
                </div>
            <div class="w-full mt-8 mb-28">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="w-full shadow-md shadow-black" v-model:content="lesson.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="w-[30%] my-6">
                <label for="image">Video</label>
                <input @change="saveVideo" type="file" class="w-full px-4 py-1 border-b outline-none file:border-0 file:text-sm">
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
        components : {
            QuillEditor
        } ,
        data() {
            return {
                parameters  : this.$route.params,
                lesson : {
                    name : '',
                    description : '',
                    video_id : 1
                }
            }
        },
        methods : {
            saveVideo(e){
                if (e.target.files) {
                    let form = new FormData();
                    form.set('video' , e.target.files[0])
                    ApiService.post('admin/videos' , form).then((res) => {
                        this.lesson.video_id = res.data.data.id
                    }).catch((res) => {
                        console.log(res);
                    })
                }
            },
            createLesson() {
                this.lesson.course_id = this.parameters.course_id;
                this.lesson.batch_id = this.parameters.batch_id;
                this.lesson.week_id = this.parameters.week_id;
                ApiService.post('admin/lessons' , this.lesson).then(() => {
                    window.location.reload();
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>