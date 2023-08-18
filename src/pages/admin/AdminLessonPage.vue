<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 v-if="heading" class="flex items-center p-4 font-semibold text-gray">
                Courses <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 {{ heading.course}} <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 {{ heading.batch }} <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 {{ heading.week }}  <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                 <span v-if="heading.lesson">{{ heading.lesson }}</span>
            </h1>
            <div class="my-auto mr-6">
                <button @click="showLessonsTable" :class="lessonsTable ? 'bg-blue-2' : 'bg-white text-black'" class="px-6 py-1 cursor-pointer">table</button>
                <button @click="showLessonForm" :class="createForm ? 'bg-blue-2' : 'bg-white text-black'" class="px-6 py-1 cursor-pointer">+ new</button>
            </div>
        </div>    
        <div>
            <LessonsView @setHeading="setHeading" @showDetails="showDetails" v-if="lessonsTable"/>
            <CreateLesson v-if="createForm"/>
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
                console.log(id);
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