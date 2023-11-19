<template>
    <div class="p-1 text-gray h-screen bg-[#EFF7FF]">
        <SuccessDialog v-if="success && message" @reload="editPw = success = false" :message="message" />
        <h1 class="text-xl font-bold sm:text-3xl sm:p-3">Account Settings</h1>
        <div class="sm:px-3 sm:w-1/2">
            <div class="my-6">
                <h1 class="font-semibold sm:text-xl">Password & Security</h1>
                <button @click="editPw = !editPw" class="flex items-center justify-between w-full p-2 mt-2 text-left bg-white rounded-sm shadow-md">Change Password
                    <span v-if="editPw" class="material-icons-outlined">expand_more</span>
                    <span v-else class="material-icons-outlined">chevron_right</span>
                </button>
                <form @submit.prevent="updatePw" v-if="editPw" class="py-2">
                    <div class="relative">
                        <input required ref="old_password" v-model="passwords.old_password" type="password" class="w-full p-1.5 my-2 outline-none border border-gray-2" placeholder="Current Password">
                        <span @click="showPw('old_password')" class="absolute end-2.5 cursor-pointer top-4 text-gray">
                            <span class="material-icons-outlined">visibility</span>
                        </span>
                    </div>
                    <div class="relative">
                        <input required ref="new_password" v-model="passwords.new_password" type="password" class="w-full p-1.5 my-2 outline-none border border-gray-2" placeholder="New Password">
                        <span @click="showPw('new_password')" class="absolute end-2.5 cursor-pointer top-4 text-gray">
                            <span class="material-icons-outlined">visibility</span>
                        </span>
                    </div>
                    <div class="relative">
                        <input required ref="confirmed_password" v-model="passwords.confirmed_password" type="password" class="w-full p-1.5 my-2 outline-none border border-gray-2" placeholder="Confirm Password">
                        <span @click="showPw('confirmed_password')" class="absolute end-2.5 cursor-pointer top-4 text-gray">
                            <span class="material-icons-outlined">visibility</span>
                        </span>
                    </div>
                    <p class="my-1 text-red">{{ errors.password }}</p>
                    <div class="flex justify-end">
                        <span @click="editPw = false" class="py-1 mr-4 cursor-pointer">cancel</span>
                        <button class="px-3 py-1 text-white rounded-sm bg-blue-3">save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';
    export default {
        components : {
            SuccessDialog
        },
        data() {
            return {
                editPw : false,
                success : false,
                message : '',
                passwords : {
                    old_password : '',
                    new_password : '',
                    confirmed_password : ''
                },
                errors : {}
            }
        },
        methods : {
            showPw(el) {
                this.$refs[el].type = this.$refs[el].type == 'password' ? 'type' : 'password';
            },
            updatePw() {
                if (this.passwords.new_password == this.passwords.confirmed_password) {
                    ApiService.post('instructors/change-password' , this.passwords).then((res) => {
                        this.message = res.data.message;
                        this.success = true;
                    }).catch((res) => {
                        this.errors.password = res.response && res.response.data ? res.response.data.message : "Something went wrong!"
                    })
                } else {
                    this.errors.password = "Please confirm the password correctly."
                    setTimeout(() => {
                        this.errors.password = '';
                    } , 3000)
                }
            }
        }
    }
</script>

<style scoped>
</style>