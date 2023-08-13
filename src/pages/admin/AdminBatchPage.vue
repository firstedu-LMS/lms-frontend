<template>
    <div>

        <div class="flex justify-between text-white ">
            <h1 class="p-2 text-lg text-gray">
                <router-link to="AdminCareerPage">Courses - </router-link>
                <router-link class="text-blue-2" to="/">{{ $route.params.id }}</router-link>
            </h1>
            <div class="my-auto mr-6">
                <span @click="showTable" :class="courseTable ? 'bg-blue-2' : 'bg-gray-2'" class="px-6 py-1.5 cursor-pointer">table</span>
                <span @click="showCreate" :class="createForm ? 'bg-blue-2' : 'bg-gray-2'" class="px-6 py-1.5 cursor-pointer">+ new</span>
            </div>
        </div>

        <div>
            <BatchesView v-if="courseTable" :id="courseId" />
            <CreateBatch v-if="createForm" />
        </div>

    </div>
</template>

<script>
import BatchesView from '@/components/admin/batches/BatchesView.vue'
import CreateBatch from '@/components/admin/batches/CreateBatch.vue'
    export default {
        components : {
            BatchesView,CreateBatch
        },
        data () {
            return {
                courseId : this.$route.params.id,
                courseTable : true,
                createForm : false,
            }
        },
        methods : {
            showCreate() {
                this.courseTable = false;
                this.createForm = true;
            },
            showTable(){
                this.courseTable = true;
                this.createForm = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>