<template>
    <div>
        <div class="flex justify-end px-6 py-2 text-white">
            <span @click="showCareersTable" :class="careersTable ? 'bg-blue-2' : 'bg-gray'" class="px-6 py-0.5">table</span>
            <span @click="showCreateForm" :class="createForm ? 'bg-blue-2' : 'bg-gray'" class="px-6 py-0.5">new</span>
        </div>
        <div>
            <CareersView v-if="careersTable" />
            <CreateCareer v-if="createForm" />
            <EditCareer v-if="editForm" :id="idForEdit" />
        </div>
        <div class="my-4">
            this is just a sample of how we go to editForm
            <p @click="showEditForm(1)">edit career 1</p>
            <p @click="showEditForm(2)">edit career 2</p>
        </div>
        <h1>You have to write delete function in CareersView component</h1>
    </div>
</template>

<script>
import CareersView from '@/components/admin/careers/CareersView.vue'
import CreateCareer from '@/components/admin/careers/CreateCareer.vue'
import EditCareer from '@/components/admin/careers/EditCareer.vue'
    export default {
        components : {
            CareersView , CreateCareer ,  EditCareer 
        },
        data () {
            return {
                careersTable : true,
                createForm : false,
                editForm : false,
                idForEdit : null,
            }
        },
        methods : {
            showCreateForm () {
                this.careersTable = this.editForm = false;
                this.createForm = true;
            },
            showCareersTable () {
                this.createForm = this.editForm = false;
                this.careersTable = true;
            },
            showEditForm (id) {
                this.careersTable = this.createForm = false;
                this.editForm = true;
                this.idForEdit = id;
            }
        }
    }
</script>

<style scoped>

</style>