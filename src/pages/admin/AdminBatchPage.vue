<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-4 text-lg font-semibold text-gray">
                <router-link :to="{name : 'AdminCoursePage'}">Courses</router-link>
                <span style="font-size: 0.9rem; margin: 0px 5px;color: gray;" class="material-icons-sharp">play_arrow</span>
                <span class="text-blue-2">{{ course.name }}</span>
            </h1>
            <div class="my-auto mr-6">
                <span @click="setActive('show')"  :class="active== 'show' ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1.5 cursor-pointer rounded-l-md">table</span>
                <span @click="setActive('create')"  :class="active == 'create' ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1.5 cursor-pointer rounded-r-md">+ new</span>
            </div>
        </div>

        <div>
            <CreateBatch @reload="setActive" v-if="active == 'create'" :course_id="courseId" />
            <EditBatch @reload="setActive" v-else-if="active == 'edit'" :batch_id="idForEdit" />
            <BatchesView @course="setCourse"  @edit="showEdit" v-else />
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
                active : 'show',
                idForEdit : ''
            }
        },
        methods : {
            setCourse(course) {
                this.course = course
            },
            setActive(component) {
                this.active = component;
            },
            showEdit(id){
                this.idForEdit = id;
                this.active = 'edit';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>