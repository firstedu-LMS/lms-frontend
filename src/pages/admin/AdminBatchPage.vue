<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-4 text-lg font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                <span class="text-blue-2">{{ course.name }}</span>
            </h1>
            <div class="my-auto mr-6">
                <span @click="showTable"  :class="batchTable ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1.5 cursor-pointer rounded-l-md">table</span>
                <span @click="showCreate"  :class="createForm ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1.5 cursor-pointer rounded-r-md">+ new</span>
            </div>
        </div>

        <div>
            <BatchesView @course="setCourse"  @edit="showEdit" v-if="batchTable" :course_id="courseId" />
            <CreateBatch @reload="showTable" v-if="createForm" :course_id="courseId" />
            <EditBatch @reload="showTable" v-if="editForm" :batch_id="idForEdit" />
        </div>

    </div>
</template>

<script>
import BatchesView from '@/components/admin/batches/BatchesView.vue'
import CreateBatch from '@/components/admin/batches/CreateBatch.vue'
import EditBatch from '@/components/admin/batches/EditBatch.vue'
    export default {
        components : {
            BatchesView,CreateBatch,EditBatch
        },
        data () {
            return {
                courseId : this.$route.params.course_id,
                course : '',
                batchTable : true,
                createForm : false,
                editForm : false,
                idForEdit : ''
            }
        },
        methods : {
            setCourse(course) {
                this.course = course
            },
            showCreate() {
                this.batchTable = false;
                this.createForm = true;
                this.editForm = false;
            },
            showTable(){
                this.batchTable = true;
                this.createForm = false;
                this.editForm = false;
            },
            showEdit(id){
                console.log(id);
                this.idForEdit = id;
                this.batchTable = false;
                this.createForm = false;
                this.editForm = true;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>