<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 v-if="heading" class="flex items-center p-4 font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <router-link :to="{name : 'AdminBatchPage' , params : {course_id : heading.courseId}}">{{ heading.courseName}}</router-link>
                 <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <router-link :to="{name : 'AdminWeekPage' , params : {batch_id : heading.batchId , course_id : heading.courseId}}">{{ heading.batchName}}</router-link>
                 <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <router-link :class="!heading.lesson ? 'text-blue-2' : ''" :to="{name : 'AdminLessonPage' , params : {batch_id : heading.batchId , course_id : heading.courseId , week_id : heading.weekId}}">{{ heading.weekName}}</router-link>
                 <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <span class="text-blue-2" v-if="heading.lesson">{{ heading.lesson }}</span>
            </h1>
            <div v-if="!show" class="my-auto mr-6">
                <button @click="showLessonsTable" :class="lessonsTable ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1 cursor-pointer rounded-l-md">table</button>
                <button @click="showLessonForm" :class="createForm ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1 cursor-pointer rounded-r-md">+ new</button>
            </div>
        </div>    
        <div>
            <LessonsView @setHeading="setHeading" @showDetails="showDetails" v-if="lessonsTable"/>
            <CreateLesson @reload="showLessonsTable" v-if="createForm"/>
            <ShowDetails @setLesson="setLesson" v-if="show" :id="idForEditAndDetail" />
            <EditLesson v-if="editForm" :id="idForEditAndDetail"/>
        </div>
    </div>
</template>

<script>
import LessonsView from '@/components/admin/lessons/LessonsView.vue'
import CreateLesson from '@/components/admin/lessons/CreateLesson.vue'
import ShowDetails from '@/components/admin/lessons/ShowDetails.vue'
import EditLesson from '@/components/admin/lessons/EditLesson.vue'
    export default {
        components : {
            LessonsView,CreateLesson,EditLesson,ShowDetails
        },
        data() {
            return {
                lessonsTable : true,
                heading : {},
                createForm : false,
                editForm : false,
                show : false,
                idForEditAndDetail : null,

            }
        },
        methods: {
            setHeading(heading) {
                this.heading = heading
            },
            setLesson(lesson) {
                this.heading.lesson = lesson;
            },
            showDetails(id) {
                this.lessonsTable = this.createForm = this.editForm = false
                this.show = true;
                this.idForEditAndDetail = id;
            },
            showLessonForm(){
                this.lessonsTable = this.editForm = this.show = false
                this.createForm = true
            },
            showLessonsTable(){
                this.createForm = this.editForm = this.show = false
                this.lessonsTable = true
            },
            showEditForm(id){
                this.lessonsTable = this.createForm = this.show = false
                this.editForm = true
                this.idForEditAndDetail = id
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>