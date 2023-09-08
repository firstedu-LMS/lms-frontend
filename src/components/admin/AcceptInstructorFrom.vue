<template>
    <div>
        <transition name="dialog">
                <dialog v-if="promptBox" class="fixed z-50 flex flex-col items-center p-6 rounded text-gray" style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
                    <span style="color: #0685e0; font-size: 6rem;" class="material-icons-sharp">verified_user</span>
                    <p class="my-6 text-xl">Are you sure to accept {{ formData.name }} ?</p>
                    <div class="w-full">
                        <button @click="$emit('close')" class="w-[40%] mx-2 py-1.5 text-white rounded hover:bg-transparent hover:text-red border border-red bg-red">Cancel</button>
                        <button @click="accept" class="w-[40%] mx-2 py-1.5 text-white rounded hover:bg-transparent hover:text-green border border-green bg-green">Okay</button>
                    </div>
                </dialog>
        </transition>
        <div v-if="!promptBox" class="flex justify-end">
            <span @click="$emit('close')" style="cursor: pointer;" class="material-icons-sharp">cancel</span>
        </div>
        <form v-if="!promptBox" @submit.prevent="promptToAccept" class="p-4 mx-6 text-white bg-green">
            <h1 class="text-center">To accept as instructor, you must set a password to create instructor profile.</h1>
            <div class="mt-4">
                <label for="name" class="mr-4">Name</label>
                <input v-model="formData.name" class="outline-none w-full text-gray px-2 py-0.5 rounded-sm" type="text">
            </div>
            <div class="mt-4">
                <label for="password" class="mr-4">Password</label>
                <input v-model="formData.password" class="outline-none w-full text-gray px-2 py-0.5 rounded-sm" type="text">
            </div>
            <div class="flex justify-end mt-4">
                <button class="px-2 py-1 rounded-sm bg-blue-2">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
    export default {
        props : ['instructor'],
        data(){
            return {
                promptBox : false,
                formData : {
                    email : '',
                    cv_id : '',
                    name : '',
                    password : ''
                }
            }
        },
        mounted () {
            this.formData.email = this.instructor.email;
            this.formData.cv_id = this.instructor.cv_id;
        },
        methods : {
            promptToAccept() {
                this.promptBox = true;
            },
            accept(){
                ApiService.post('admin/applications/add-instructor' , this.formData).then(() => {
                    console.log('hello');
                    this.$router.push({name : 'AdminInstructorPage'})
                }).catch((res) => {
                    console.log('error');
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>
.dialog-enter-from , .dialog-leave-to {
  transform: scale(90%)
}
.dialog-enter-active , .dialog-leave-active {
  transition: all 0.2s ease-out;
}
</style>