<template>
    <div class="p-2">
        <SuccessDialog v-if="weekCompleted" message="All lessons of this week are completed." @reload="$router.push({name : 'StudentCourseDetailPage'})" />
        <div class="flex items-center justify-between mb-6">
            <button @click="$router.go(-1)" class="sm:ml-4">
                <span class="material-icons-outlined">arrow_back</span>
            </button>
            <router-link :to="{name : 'StudentAssignmentsPage' , params : {student_id : student_id , course_id : course_id , batch_id : batch_id}}" class="px-2 py-0.5 sm:mr-6 text-white rounded bg-blue-2">Assignment</router-link>
        </div>
        <div class="justify-around sm:flex">
            <ul class="sm:w-[25%] h-fit rounded bg-gray-2 mb-12" v-if="lessons.length">
                <h1 v-if="lessons[0].week" class="my-3 text-lg font-bold text-center">{{ lessons[0].week.week_number }}</h1>
                <li class="p-2 text-sm border border-gray-3" v-for="lesson,index in lessons" :key="lesson.id">
                    <div  class="flex justify-between">
                        <button :disabled="!lesson.locked" @click="changeActiveLesson(lesson)" :class="lesson.id == active_lesson.id ? 'text-blue-2' : ''">
                            <p class="w-fit">Lesson - {{ index + 1 }}</p>
                            <p class="w-fit">{{ lesson.name }}</p>
                        </button>
                        <span v-if="!lesson.locked" style="color: red; font-size: 18px;margin-left: 7px; margin-top: 3px;" class="material-icons-sharp">lock</span>
                    </div>
                    <button @click="showQuestionsFun(lesson.id)" class="w-full mt-3 text-left">Questions</button>
                </li>
            </ul>

            <!-- show lesson -->
            <div v-if="showLesson && active_lesson.video" class="mb-12 sm:w-2/3">
                <video class="mb-8 rounded h-fit" v-if="active_lesson" controls controlsList="nodownload" >
                    <source :src="filePath.videoPath(active_lesson.video.video)" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <h1 class="my-8 text-2xl font-bold">{{ active_lesson.name }}</h1>
                <h3 class="text-lg font-bold">Description</h3>
                <p class="my-4" v-html="active_lesson.description"></p>
                <button @click="showQuestionsFun(active_lesson.id)" class="bg-blue-2 px-4 py-1.5 text-white">Go to questions &raquo;</button>
            </div>

            <AssignmentsView class="mb-12 sm:w-2/3" v-if="showAssignments" />
            <QuestionsView @nextLesson="nextLesson" @reload="getLessons"  :lesson_id="lessonIdForQues"  class="mb-12 sm:w-2/3" v-if="showQuestions" />
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '@/services/public/filePath';
import AssignmentsView from '@/components/student/AssignmentView.vue';
import QuestionsView from '@/components/student/QuestionsView.vue';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';
    export default {
        components : {
            AssignmentsView , QuestionsView , SuccessDialog
        },
        data () {
            return {
                filePath : filePath,
                student_id : this.$route.params.student_id,
                course_id : this.$route.params.course_id,
                batch_id : this.$route.params.batch_id,
                week_id : this.$route.params.week_id,
                lessons : [],
                active_lesson : {},
                showLesson : true,
                showAssignments : false,
                showQuestions : false,
                lessonIdForQues : 0,
                weekCompleted : true
            }
        },
        async mounted () {
            await this.getLessons();
            this.active_lesson = this.lessons[0]
        },

        methods : {
             async getLessons () {
                 return ApiService.get(`students/get-lessons-of-week/${this.student_id}/${this.course_id}/${this.batch_id}/${this.week_id}`).then((res) => {
                    this.lessons = res.data.data
                    console.log(this.lessons);
                }).catch((res) => {
                    console.log(res);
                })
            },
            changeActiveLesson (lesson) {
                if (lesson.locked) {
                    this.active_lesson = lesson
                    this.showLesson = true
                    this.showAssignments = this.showQuestions = false;
                } else {
                    alert('complete prejvious lessons')
                }
            },
            showAssignmentsFun() {
                if (this.showAssignments) {
                    this.showAssignments = this.showQuestions = false;
                    this.showLesson = true;
                } else {
                    this.showLesson = this.showQuestions = false;
                    this.showAssignments = true;
                }
            },
            showQuestionsFun(id){
                this.showAssignments = this.showLesson = false;
                this.showQuestions = true;
                this.lessonIdForQues = id;
            },
            nextLesson(id) {
                if (this.lessons[0].id == id) {
                    this.weekCompleted = true;
                } else {
                    this.lessons.forEach((lesson , index) => {
                    if (lesson.id == id) {
                        this.changeActiveLesson(this.lessons[index + 1])
                    } else {
                        this.showQuestions = false;
                        this.showLesson = true;
                    }
                })
                }
            }
        }
    }
</script>

<style scoped>

</style>