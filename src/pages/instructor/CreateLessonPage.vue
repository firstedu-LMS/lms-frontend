<template>
    <div class="p-1 sm:px-6">
        <SuccessDialog
            :message="`Lesson has been created successfully.`"
            @reload="$router.push({name : 'InstructorLessonsPage' , params : {course_id : parameters.course_id, batch_id : parameters.batch_id, week_id : parameters.week_id}})"
            v-if="created" />

        <div class="flex justify-between py-6">
            <div class="flex items-center">
                <span @click="$router.go(-1)" style="cursor: pointer;" class="material-icons-outlined">arrow_back</span>
                <h1 class="text-2xl font-bold sm:mx-4 ">Week - 12</h1>
            </div>
            <div class="my-auto">
                <router-link
                    class="px-6 py-2 cursor-pointer rounded-l-md"
                    active-class="text-white bg-cyan-2"
                    :to="{name : 'InstructorLessonsPage' , params : {course_id : parameters.course_id, batch_id : parameters.batch_id, week_id : parameters.week_id}}">
                    Table
                </router-link>
                <router-link
                    class="px-6 py-2 cursor-pointer rounded-r-md"
                    active-class="text-white bg-cyan-2"
                    :to="{name : 'CreateLessonPage' , params : {course_id : parameters.course_id, batch_id : parameters.batch_id, week_id : parameters.week_id}}">
                    + New
                </router-link>
            </div>
        </div>
        <form class="flex flex-wrap" @submit.prevent="createLesson" >
                <div class="w-full my-6">
                    <label class="text-[12px] font-semibold" for="name">Name</label>
                    <input v-model="lesson.name" type="text" class="px-2 sm:w-[30%] mx-5 py-1 border-b outline-none">
                    <p v-if="errors.name" class="py-1 mx-12 text-red">{{ errors.name[0] }}</p>
                </div>
            <div class="w-full mt-8 mb-48 sm:mb-28">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="w-full shadow-md shadow-black" v-model:content="lesson.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
                <p v-if="errors.description" class="py-1 mx-12 text-red">{{ errors.description[0] }}</p>

            </div>
            <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
                loading . . .
            </div>
            <div class="w-full my-6">
                <label for="image">Video</label>
                <input @change="saveVideo"  type="file" class="sm:w-[30%] px-4 py-1 border-b outline-none file:border-0 file:text-sm">
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
import SuccessDialog from '@/components/dialog/SuccessDialog.vue'
    export default {
        components : {
            QuillEditor , SuccessDialog
        } ,
        data() {
            return {
                loading : false,
                created : false,
                parameters : this.$route.params,
                lesson : {
                    name : '',
                    description : '',
                    video_id : null
                },
                errors : {},

            }
        },
        methods : {
            saveVideo(e){
                if (e.target.files) {
                    let form = new FormData();
                    form.set('video' , e.target.files[0])
                    this.loading = true
                    ApiService.post('instructors/videos' , form).then((res) => {
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
                this.lesson.course_id = this.parameters.course_id;
                this.lesson.batch_id = this.parameters.batch_id;
                this.lesson.week_id = this.parameters.week_id;
                this.loading = true
                ApiService.post('instructors/lessons' , this.lesson).then(() => {
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