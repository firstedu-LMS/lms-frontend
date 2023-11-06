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
                <button @click="setActive('show')" :class="active == 'show' ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1 cursor-pointer rounded-l-md">table</button>
                <button @click="setActive('create')" :class="active == 'create' ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1 cursor-pointer rounded-r-md">+ new</button>
            </div>
        </div>    
        <div>
            <CreateLesson @reload="setActive" v-if="active == 'create'"/>
            <ShowDetails @setLesson="setLesson" v-else-if="active == 'details'" :id="idForEditAndDetail" />
            <EditLesson v-else-if="active == 'edit'" :id="idForEditAndDetail"/>
            <LessonsView @setHeading="setHeading" @showDetails="showDetails" v-else/>
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
                heading : {},
                active : 'show',
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
                this.setActive('details');
                this.idForEditAndDetail = id;
            },
            setActive(component) {
                this.active = component;
            },
            showEditForm(id){
                this.setActive('edit');
                this.idForEditAndDetail = id
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>