<template>
    <form @submit.prevent="submitQuestion" action="" class="px-3">
        <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
        </div>
        <div  v-for="(question,index) in questions" :key="question" class="border-b">
            {{ 
                trueAnswer[index] = question.answer
            }}
            <h1 class="font-semibold my-4">Question - {{ question.id }}</h1>
            <h1 class="my-2">{{ question.title }}</h1>
            <div class="my-3">
                <div>
                    <input type="radio"  :value="question.choice1" v-model="answers[index]"/>
                    <label class="mx-3">{{ question.choice1 }}</label>     
                </div>
                <div>
                    <input type="radio"  :value="question.choice2"  v-model="answers[index]"/>
                    <label class="mx-3">{{ question.choice2 }}</label>     
                </div>
                <div>
                    <input type="radio"  :value="question.choice3"  v-model="answers[index]"/>
                    <label class="mx-3">{{ question.choice3 }}</label>     
                </div>
            </div>
        </div>
        <div class="flex">
            <button :disabled="loading" class="py-1.5 px-2 bg-blue-2 text-white my-6">Submit</button>
            <button class="py-1 px-3 bg-blue-2 mx-3 flex  items-center text-white my-6">
            <span class="material-icons-sharp">keyboard_double_arrow_right</span>&nbsp;Next
            </button>
        </div>
    </form>
</template>

<script>
import ApiService from '@/services/ApiService'
    export default {
        props : ["lesson_id"],
        data() {
            return {
                questions : [],
                answers : [],
                trueAnswer:[],
                submitData : {
                    answers : '',
                    trueAnswers : '',
                },            
                loading : false
            }
        },
        methods: {
            submitQuestion(){
                this.loading = true,
                this.submitData.answers = this.answers,
                this.submitData.trueAnswers = this.trueAnswer,
                ApiService.post(`students/question/submissions/`,this.submitData).then((res) => {
                    console.log(res);
                    this.loading =false
                }).catch((res) => {
                    console.log(res);
                    this.loading =false

                })
            }
        },

        mounted() {
            ApiService.get(`students/question/${this.lesson_id}`).then((res) => {
                this.questions = res.data.data
                console.log(res.data.data);
                
            }).catch((res) => {
                console.log(res);
            })
        },
    }
</script>

<style scoped>

</style>