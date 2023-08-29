<template>
    <div>
        <div class="w-3/4 pb-10 mx-auto" >
            <video v-if="lesson.video" controls>
                <source :src="filePath.videoPath(lesson.video.video)" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h1 class="my-4 text-lg">{{ lesson.name }}</h1>
            <p v-html="lesson.description"></p>

            <div>
                <button @click="showForm" class="px-3 py-1 my-4 text-white rounded bg-blue-2">Add Question +</button>

                <div>
                    <div v-for="question in questions" :key="question">
                        <div class="flex border border-b-0">
                            <p class="py-1 text-center border-r w-[15%]">Question</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.title }}</p>
                        </div>
                        <div class="flex border border-b-0">
                            <p class="py-1 text-center border-r w-[15%]">Option 1</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.choice1 }}</p>
                        </div>
                        <div class="flex border border-b-0">
                            <p class="py-1 text-center border-r w-[15%]">Option 2</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.choice2 }}</p>
                        </div>
                        <div class="flex border border-b-0">
                            <p class="py-1 text-center border-r w-[15%]">Option 3</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.choice3 }}</p>
                        </div>
                        <div class="flex border">
                            <p class="py-1 text-center border-r w-[15%]">Answer</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.answer }}</p>
                        </div>
                        <button class="float-right px-4 py-1 my-2 text-white rounded-sm bg-red">remove</button>
                        <button @click="showForm" class="px-3 py-1 mt-10 mb-2 text-white rounded bg-blue-2">Add Question +</button>
                    </div>
                </div>

                <form v-if="quesForm" class="py-4" @submit.prevent="CreateQues">
                    <div class="flex border border-b-0">
                        <span class="text-center w-[15%] border-r py-1">
                            Question
                        </span>
                        <input v-model="question.title" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-b-0">
                        <span class="text-center w-[15%] border-r py-1">
                            Option-1
                        </span>
                        <input v-model="question.choice1" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-b-0">
                        <span class="text-center w-[15%] border-r py-1">
                            Option-2
                        </span>
                        <input v-model="question.choice2" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-b-0">
                        <span class="text-center w-[15%] border-r py-1">
                            Option-3
                        </span>
                        <input v-model="question.choice3" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border">
                        <span class="text-center w-[15%] border-r py-1">
                            Answer
                        </span>
                        <input v-model="question.answer" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <button class="float-right px-4 py-1 my-4 bg-white shadow-lg">create</button>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '../../../services/public/filePath';
    export default {

        props : {
            id : {
                required  : true
            }
        },
        data() {
            return {
                addQues : true,
                quesForm : false, 
                questions : [],
                question : {
                    title : '',
                    choice1 : '',
                    choice2: '',
                    choice3 : '',
                    answer : '',
                },
                lesson : {},
                filePath : filePath
            }
        },
        methods : {
            showForm(){
                this.addQues = false
                this.quesForm = true       
            },
            CreateQues(){
                this.question.lesson_id = this.lesson.id
                ApiService.post('admin/questions', this.question).then((res) => {
                  console.log(res.data.data);
                  this.questions.push(res.data.data);
                  this.question = {};
                }).catch((res) => {
                    console.log(res);
                })
            },
            deleteQues(id){
                ApiService.delete(`admin/questions/${id}`).then(()=>{
                    window.location.reload()
                }).catch((res) => {
                    console.log(res.data.data);
                })
            }
        },
        mounted () {
            ApiService.get(`admin/lessons/${this.id}`).then((res) => {
                this.lesson = res.data.data;
                console.log(this.lesson);
                this.$emit('setLesson' , this.lesson.name)
            }).catch((res) => {
                console.log(res);
            })
            ApiService.get(`admin/questions`).then((res) => {
                this.questions = res.data.data
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>