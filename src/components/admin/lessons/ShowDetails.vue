<template>
    <div>
        <div class="w-3/4 pb-10 mx-auto" >
            <video v-if="lesson.video" controls>
                <source :src="filePath.videoPath(lesson.video.video)" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h1 class="my-4 text-lg">{{ lesson.name }}</h1>

            <div class="my-6">
                <button :class="showDesc? 'bg-blue-2 text-white' : ''" class="w-1/2 py-2 border border-r-0 border-blue-2" @click="() => {showDesc = true;showQues = false}">Descriptions</button>
                <button :class="showQues? 'bg-blue-2 text-white' : ''" class="w-1/2 py-2 border border-blue-2" @click="() => {showDesc = false;showQues = true}">Questions</button>
            </div>

            <p v-if="showDesc" v-html="lesson.description"></p>

            <div v-if="showQues">
                <button v-if="questions.length" @click="showForm" class="px-3 py-1 my-4 text-white rounded bg-blue-2">Add Question +</button>

                <div>
                    <div class="p-2 shadow-md" v-for="question in questions" :key="question">
                        <div class="flex border border-b-0 border-gray-2">
                            <p class="py-1 text-center border-r border-gray-2 w-[15%]">Question</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.title }}</p>
                        </div>
                        <div class="flex border border-b-0 border-gray-2">
                            <p class="py-1 text-center border-r border-gray-2 w-[15%]">Option 1</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.choice1 }}</p>
                        </div>
                        <div class="flex border border-b-0 border-gray-2">
                            <p class="py-1 text-center border-r border-gray-2 w-[15%]">Option 2</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.choice2 }}</p>
                        </div>
                        <div class="flex border border-b-0 border-gray-2">
                            <p class="py-1 text-center border-r border-gray-2 w-[15%]">Option 3</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.choice3 }}</p>
                        </div>
                        <div class="flex border border-gray-2">
                            <p class="py-1 text-center border-r border-gray-2 w-[15%]">Answer</p>
                            <p class="py-1 px-4 w-[85%]">{{ question.answer }}</p>
                        </div>
                        <div class="flex justify-end">
                            <button @click="deleteQues(question.id)" class="px-4 py-1 my-2 text-white rounded-sm bg-red">remove</button>
                        </div>
                    </div>
                    <button @click="showForm" class="px-3 py-1 mt-10 mb-2 text-white rounded bg-blue-2">Add Question +</button>
                </div>

                <form v-if="quesForm" class="p-4 shadow-md" @submit.prevent="CreateQues">
                    <div class="flex border border-b-0 border-gray-2">
                        <span class="text-center w-[15%] border-r border-gray-2 py-1">
                            Question
                        </span>
                        <input v-model="question.title" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-b-0 border-gray-2">
                        <span class="text-center w-[15%] border-r border-gray-2 py-1">
                            Option-1
                        </span>
                        <input v-model="question.choice1" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-b-0 border-gray-2">
                        <span class="text-center w-[15%] border-r border-gray-2 py-1">
                            Option-2
                        </span>
                        <input v-model="question.choice2" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-b-0 border-gray-2">
                        <span class="text-center w-[15%] border-r border-gray-2 py-1">
                            Option-3
                        </span>
                        <input v-model="question.choice3" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex border border-gray-2">
                        <span class="text-center w-[15%] border-r border-gray-2 py-1">
                            Answer
                        </span>
                        <input v-model="question.answer" type="text" class="w-[85%] outline-none px-2 bg-transparent"/>
                    </div>
                    <div class="flex justify-end">
                        <button class="px-4 py-1 my-4 bg-white shadow-lg">create</button>
                    </div>
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
                showDesc : true,
                showQues : false,
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
            getQuestions () {
                ApiService.get(`admin/questions`).then((res) => {
                    this.questions = res.data.data
                }).catch((res) => {
                    console.log(res);
                })
            },
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
                    this.getQuestions();
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

            this.getQuestions();
        }
    }
</script>

<style lang="scss" scoped>

</style>