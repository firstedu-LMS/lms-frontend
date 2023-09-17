<template>
    <div>
        <div class="flex justify-between text-white ">
            <h1 class="p-2 text-xl font-bold text-gray">Careers</h1>
            <div class="my-auto mr-6">
                <button @click="showCareersTable" :class="careersTable ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1 font-semibold rounded-l-md">table</button>
                <button @click="showCreateForm" :class="createForm ? 'bg-cyan shadow-inner' : 'bg-white text-black  shadow-lg'" class="px-6 py-1 font-semibold rounded-l-md">+ new</button>
            </div>
        </div>
        <div>
            <CareersView @edit="showEditForm" v-if="careersTable" />
            <CreateCareer @reload="showCareersTable" v-if="createForm" />
            <EditCareer v-if="editForm" :id="idForEdit" />
        </div>
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