<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-2 text-xl font-bold text-gray">Courses</h1>
            <div class="my-auto mr-6">
                <span @click="showTable" class="px-4 py-1"  :class="courseTable ? 'bg-blue-2' : 'bg-gray-2'">table</span>
                <span @click="showCreate" class="px-4 py-1 " :class="courseCreate ? 'bg-blue-2': 'bg-gray-2' ">+ new</span>
            </div>
        </div>
        <div>
            <CoursesView @edit="showEdit" v-if="courseTable" />
            <CreateCourse v-if="courseCreate" />
            <EditCourse :id="idToEdit"  v-if="courseEdit" />
        </div>
    </div>
</template>

<script>
import CoursesView from '@/components/admin/courses/CoursesView.vue'
import CreateCourse from '@/components/admin/courses/CreateCourse.vue'
import EditCourse from '@/components/admin/courses/EditCourse.vue'
export default {
    components : {
        CoursesView,CreateCourse,EditCourse
    },
    data () {
        return {
            courseTable : true,
            courseCreate : false,
            courseEdit : false,
            idToEdit : null
        }
    },
    methods : {
        showTable() {
            this.courseTable = true;
            this.courseCreate = false;
            this.courseEdit = false;
        },
        showCreate() {
            this.courseTable = false;
            this.courseCreate = true;
            this.courseEdit = false;
        },
        showEdit(id) {
            this.idToEdit = id;
            this.courseTable = false;
            this.courseCreate = false;
            this.courseEdit = true;
        }

    }
}
</script>

<style lang="scss" scoped>

</style>