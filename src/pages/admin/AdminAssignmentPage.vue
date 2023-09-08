<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 v-if="heading" class="flex items-center p-2 font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                <router-link :to="{name : 'AdminBatchPage' , params : {course_id : 1}}">The  Course Name</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                <span>Batch 1</span>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                <span class="text-blue-2">Assignments</span>
            </h1>
            <div class="flex mx-4">
                <div class="relative flex h-fit my-auto flex-col items-center py-0.5 bg-white mx-6 text-gray">
                    <button class="flex items-center justify-between w-32 px-4 rounded" @click="onSelect = !onSelect">
                        <span>Assignments</span> 
                        <span class="material-icons-outlined">arrow_drop_down</span>
                    </button>
                    <button @click="changePage" class="absolute z-50 w-32 px-4 py-1 bg-white rounded top-8" v-if="onSelect">Weeks</button>
                </div>
                <button @click="showTable" class="px-6 py-1 my-auto font-semibold h-fit rounded-l-md"  :class="table ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'">table</button>
                <button @click="showCreate" class="px-6 py-1 font-semibold h-fit rounded-r-md" :class="createForm ? 'bg-cyan shadow-inner': 'bg-white text-black  shadow-lg' ">+ new</button>
            </div>
        </div>

        <AssignmentView @edit="editAssignment" v-if="table" />
        <CreateAssignment v-if="createForm" />
        <EditAssignment v-if="editForm" :id="idforEdit" />

    </div>
</template>

<script>
import AssignmentView from '@/components/admin/assignments/AssignmentsView.vue'
import CreateAssignment from '../../components/admin/assignments/CreateAssignment.vue'
import EditAssignment from '@/components/admin/assignments/EditAssignment.vue'
    export default {
        components : {
            AssignmentView,CreateAssignment,EditAssignment
        },
        data(){
            return {
                heading : {},
                page : 'assignments',
                createForm : false,
                editForm : false,
                onSelect : false,
                table : true,
                idforEdit : null
            }
        },
        methods : {
            changePage() {
                    this.$router.push({name : 'AdminWeekPage' , params : {course_id : this.$route.params.course_id , batch_id : this.$route.params.batch_id}})
            },
            editAssignment(id){
                this.idforEdit = id
                this.table = this.createForm = false;
                this.editForm = true;
            },
            showTable() {
                this.table = true;
                this.createForm = this.editForm = false;
            },
            showCreate(){
                this.table = this.editForm = false;
                this.createForm = true;
            }
        }
    }
</script>

<style scoped>

</style>