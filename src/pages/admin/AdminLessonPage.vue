<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-2 text-xl font-bold text-gray">Lessons</h1>
            <div class="my-auto mr-6">
                <button @click="showLessonsTable" :class="lessonsTable ? 'bg-blue-2' : 'bg-white text-black'" class="px-6 py-1.5 cursor-pointer">table</button>
                <button @click="showLessonForm" :class="createForm ? 'bg-blue-2' : 'bg-white text-black'" class="px-6 py-1.5 cursor-pointer">+ new</button>
            </div>
        </div>    
        <div>
            <LessonsView @click="showEditForm" v-if="lessonsTable"/>
            <CreateLesson v-if="createForm"/>
            <EditLesson v-if="editForm" :id="idForEdit"/>
        </div>
    </div>
</template>

<script>
import LessonsView from '@/components/admin/lessons/LessonsView.vue'
import CreateLesson from '@/components/admin/lessons/CreateLesson.vue'
import EditLesson from '@/components/admin/lessons/EditLesson.vue'
    export default {
        components : {
            LessonsView,CreateLesson,EditLesson
        },
        data() {
            return {
                lessonsTable : true,
                createForm : false,
                editForm : false,
                idForEdit : null,

            }
        },
        methods: {
            showLessonForm(){
                this.lessonsTable = this.editForm = false
                this.createForm = true
            },
            showLessonsTable(){
                this.createForm = this.editForm = false
                this.lessonsTable = true
            },
            showEditForm(id){
                this.lessonsTable = this.createForm = false
                this.editForm = true
                this.idForEdit = id
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>