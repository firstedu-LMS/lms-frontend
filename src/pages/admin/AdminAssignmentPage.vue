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
            <div class="mx-4">
                <select @change="changePage" class="px-2 py-1.5 m-3 mr-6 bg-transparent border outline-none border-gray text-gray" v-model="page">
                    <option selected value="assignments">Assignments</option>
                    <option value="weeks">Weeks</option>
                </select>
                <button @click="showTable" class="px-6 py-1 font-semibold rounded-l-md"  :class="table ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'">table</button>
                <button @click="showCreate" class="px-6 py-1 font-semibold rounded-r-md" :class="createForm ? 'bg-cyan shadow-inner': 'bg-white text-black  shadow-lg' ">+ new</button>
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
                table : true,
                idforEdit : null
            }
        },
        methods : {
            changePage(e) {
                if (e.target.value == 'weeks') {
                    this.$router.push({name : 'AdminWeekPage' , params : {course_id : this.$route.params.course_id , batch_id : this.$route.params.batch_id}})
                }
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