<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-2 text-xl font-bold text-gray">Courses</h1>
            <div class="my-auto mr-6">
                <button @click="setActive('show')" class="px-6 py-1 font-semibold rounded-l-md"  :class="active == 'show' ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'">table</button>
                <button @click="setActive('create')" class="px-6 py-1 font-semibold rounded-r-md" :class="active == 'create' ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg' ">+ new</button>
            </div>
        </div>
        <div>
            <CreateCourse @reload="setActive" v-if="active == 'create'" />
            <EditCourse @reload="setActive" :id="idToEdit"  v-else-if="active == 'edit'" />
            <CoursesView @edit="showEdit" v-else />
        </div>
    </div>
</template>

<script>
import CoursesView from '@/components/admin/courses/CoursesView.vue'
import CreateCourse from '@/components/admin/courses/CreateCourse.vue'
import EditCourse from '@/components/admin/courses/EditCourse.vue'
export default {
    components : {
        CoursesView, CreateCourse, EditCourse
    },
    data () {
        return {
            active : 'show',
            idToEdit : null
        }
    },
    methods : {
        setActive (component) {
            this.active = component;
        },
        showEdit(id) {
            this.idToEdit = id;
            this.setActive('edit')
        }

    }
}
</script>

<style lang="scss" scoped>

</style>
