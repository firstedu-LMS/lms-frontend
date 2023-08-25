<template>
    <div>
        <div class="w-3/4 mx-auto pb-10" >
            <video v-if="lesson.video" controls>
                <source :src="filePath.videoPath(lesson.video.video)" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h1 class="my-4 text-lg">{{ lesson.name }}</h1>
            <p v-html="lesson.description"></p>

            <div>
                <button v-if="addQues" @click="showForm" class="bg-blue-2 px-3 py-1 mt-2 rounded text-white">Add Ques +</button>
                <form v-if="quesForm" class="py-2" @submit.prevent="CreateQues">
                    <button class="bg-blue-2 px-3 py-1 my-2 rounded text-white">Add Ques +</button>
                    <div class="relative flex flex-wrap">
                        <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                            Question
                        </span>
                        <input v-model="question.title" type="text" class="w-[84%] block rounded-r border border-gray-2 bg-transparent"/>
                    </div>
                    <div class="relative flex flex-wrap">
                        <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                            Option-1
                        </span>
                        <input v-model="question.choice1" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                    </div>
                    <div class="relative flex flex-wrap">
                        <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                            Option-2
                        </span>
                        <input v-model="question.choice2" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                    </div>
                    <div class="relative flex flex-wrap">
                        <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                            Option-3
                        </span>
                        <input v-model="question.choice3" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                    </div>
                    <div class="relative flex flex-wrap">
                        <span class="flex px-4 py-1 items-center rounded-l border border-r-0 border-solid">
                            Answer
                        </span>
                        <input v-model="question.answer" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                    </div>
                </form>
                <div>
                    <div v-for="question in questions" :key="question" class="relative flex flex-wrap">
                        <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                            Question
                        </span>
                        <input v-model="question.title" type="text" class="w-[84%] block rounded-r border border-gray-2 bg-transparent"/>
           
                            <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                                Option-1
                            </span>
                            <input v-model="question.choice1" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
      
                            <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                                Option-2
                            </span>
                            <input v-model="question.choice2" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                            <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                                Option-3
                            </span>
                            <input v-model="question.choice3" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                            <span class="flex px-4 py-1 items-center rounded-l border border-r-0 border-solid">
                                Answer
                            </span>
                            <input v-model="question.answer" type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
                        <div class="w-[95%] flex justify-end">
                            <button @click="deleteQues(question.id)" class="bg-red px-3 py-1 rounded my-1 text-white">Remove -</button>
                        </div>
                    </div>
                </div>
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
                ApiService.post('admin/questions', this.question).then(() => {
                  window.location.reload()  
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