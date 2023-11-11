<template>
    <div>
        <div class="w-full bg-white rounded-md">
            <div v-if="score" class="py-1 text-center text-white rounded-md bg-oragne" :class="`w-[${score}]`">
                {{ score }}
            </div>
            <div v-else class="py-1 text-center rounded-full">
                0%
            </div>
        </div>

        <form  @submit.prevent="submitQuestion" class="px-3">
        <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
        </div>
        <div  v-for="(question,index) in questions" :key="question" class="border-b">
            <h1 class="my-4 font-semibold">Question - {{ index + 1 }}</h1>
            <h1 class="my-2">{{ question.title }}</h1>
            <div class="my-3">
                <div>
                    <input  type="radio"  :value="question.choice1" v-model="answers[index]"/>
                    <label class="mx-3">{{ question.choice1 }}</label>     
                </div>
                <div>
                    <input  type="radio"  :value="question.choice2"  v-model="answers[index]"/>
                    <label class="mx-3">{{ question.choice2 }}</label>     
                </div>
                <div>
                    <input  type="radio"  :value="question.choice3"  v-model="answers[index]"/>
                    <label class="mx-3">{{ question.choice3 }}</label>     
                </div>
            </div>
        </div>
            <button :disabled="loading" v-if="!score" class="py-1.5 px-2 bg-blue-2 text-white my-6">Submit</button>                  
    </form>
    <button @click="next" v-if="score" class="flex items-center px-3 py-1 mx-3 my-6 text-white bg-blue-2">
            <span class="material-icons-sharp">keyboard_double_arrow_right</span>&nbsp;Next
    </button>
    </div>

</template>

<script>
import ApiService from '@/services/ApiService'
    export default {
        props : ["lesson_id","lesson_array"],
        data() {
            return {
                questions : [],
                answers : [],
                trueAnswer: [],
                score : '',
                submitData : {
                    answers : '',
                    trueAnswers : '',
                },            
                loading : false,
            }
        },
        mounted() {
            this.getQues();
        },
        methods: {
            getQues(){
                ApiService.get(`students/question/${this.lesson_id}`).then((res) => {
                this.questions = res.data.data.question
                let correctAnswer = []
                correctAnswer = res.data.data.question
                for (let index = 0; index < correctAnswer.length; index++) {
                    let data = correctAnswer[index].answer;
                    this.trueAnswer.push(data)
                }
                let score = res.data.data.score.toString()
                if (score) {
                    this.score = score + "%";   
                }          
            }).catch((res) => {
                console.log(res);
            })
            },
            submitQuestion(){
                this.loading = true,
                this.submitData.lesson_id = this.lesson_id,
                this.submitData.week_id = this.$route.params.week_id,
                this.submitData.batch_id = this.$route.params.batch_id,
                this.submitData.student_id = this.$route.params.student_id,
                this.submitData.course_id = this.$route.params.course_id,
                this.submitData.answers = this.answers,
                this.submitData.trueAnswers = this.trueAnswer,
                ApiService.post(`students/question/submissions/`,this.submitData).then((res) => {
                    console.log(res);
                    this.$emit('reload')
                    this.getQues();
                //     let i = this.lesson_array.findIndex((id)=>{
                //     return this.lesson_id == id
                // })
                // if (i +1 <= this.lesson_array.length){
                //     this.nextLesson = this.lesson_array[i +1] 
                // }
                    this.loading =false
                }).catch((res) => {
                    console.log(res);
                })
            },

            next() {
                this.$emit('nextLesson' , this.lesson_id)
            }
            

        },

    }
</script>

<style scoped>

</style>