<template>
    <div>
        <div v-if="profile && profile.user" class="my-8 sm:flex">
            <img v-if="profile && profile.user && profile.user.image" :src="filePath.imagePath(profile.user.image.image)" style="height : 220px;width : 220px;" class="mx-16 border-8 rounded-full border-teal sm:my-8 sm:mx-16 sm:px-6 " alt="">
            <div class="sm:w-[70%]">
                <h1 class="px-8 py-4 text-3xl font-bold sm:px-12 sm:py-8 sm:mt-4 sm:mx-1">{{ profile.user.name }}</h1>
                <p class="font-semibold px-8 py-1 text-lg sm:px-1.5 sm:mx-12">Student ID - {{ profile.id }}</p>
                <p class="font-semibold text-lg px-8 py-1 sm:my-6 sm:px-1.5 sm:mx-12">Joined at - {{ profile.created_at }}</p>
            </div>
        </div>
<!-- for responsive that I can do as much as I can hee" -->
       <div class="w-full sm:hidden bg-gray-2">
            <button @click="showInfo" class="items-center w-1/2 py-1 " :class="info ? 'bg-blue-2 text-white': 'bg-white text-gray'">Personal Information</button>
            <button @click="showActivity" class="items-center w-1/2 py-1" :class="activities ? 'bg-blue-2 text-white': 'bg-white text-gray'">Activities</button>
        <div v-if="info" class="mx-1 my-6">
              <div class="mt-6 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                    <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">EMAIL ADDRESS</p>
                    <p class="py-4 px-4 w-[60%]"></p>
                </div>
                <div class="flex border border-b-0 border-gray-2">
                    <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">PHONE NUMBER</p>
                    <p class="py-4 px-4 w-[60%]"></p>
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">EDUCATION</p>
                        <p class="py-4 px-4 w-[60%]"></p>
                </div>   
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">DATE OF BIRTH</p>
                        <p class="py-4 px-4 w-[60%]"></p>
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">ADDRESS</p>
                        <p class="py-4 px-4 w-[60%]"></p>
                </div>
            </div>
        </div>
        <div v-if="activities" class="w-full">
                <div class="mx-1 my-6 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-5 text-xs px-3 font-semibold text-center border-r border-gray-2 w-[40%]">IN-PROGRESS COURSES</p>
                        <p class="py-5 text-xs font-semibold px-4 w-[60%]"></p>
                </div>     
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-6 px-3 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">COMPLETED COURSES</p>
                        <p class="py-6 text-xs font-semibold px-4 w-[60%]"></p>
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-6 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">ACHIEVEMENTS</p>
                        <p class="py-6 text-xs font-semibold px-4 w-[60%]"></p>
                </div>                      
            </div>
        </div>
        </div>
<!--  -->
        <div class="flex justify-around max-sm:hidden bg-gray-2">
            <div class="sm:w-[45%] sm:mt-6">
                <p class="font-semibold underline text-blue-2">Personal information</p>
                <div class="mt-6 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">EMAIL ADDRESS</p>
                        <p class="py-1.5 px-4 w-[60%]"></p>
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">PHONE NUMBER</p>
                        <p class="py-1.5 px-4 w-[65%]"></p>
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">EDUCATION</p>
                        <p class="py-1.5 px-4 w-[65%]"></p>
                </div>   
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">DATE OF BIRTH</p>
                        <p class="py-1.5 px-4 w-[65%]"></p>
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">ADDRESS</p>
                        <p class="py-1.5 px-4 w-[65%]"></p>
                </div>
                </div>
            </div>
            <div class="w-[45%] mt-6">
                <p class="font-semibold underline text-blue-2">Activites</p>
                <div class="mt-6 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-5 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">IN-PROGRESS COURSES</p>
                        <p class="py-5 text-xs font-semibold px-4 w-[60%]"></p>
                </div>     
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-6 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">COMPLETED COURSES</p>
                        <p class="py-6 text-xs font-semibold px-4 w-[60%]"></p>
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-6 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">ACHIEVEMENTS</p>
                        <p class="py-6 text-xs font-semibold px-4 w-[60%]"></p>
                </div>                      
            </div>
            </div>
        </div>       
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import filePath from '@/services/public/filePath'
    export default {
        data() {
            return {
                info: true,
                profile : {},
                filePath : filePath,
                activities : false,
            }
        },
        methods: {
            showInfo() {
                this.info = true,
                this.activities = false               
            },
            showActivity() {
                this.info = false,
                this.activities = true
            }
        },
        mounted(){
            ApiService.get('student/user').then((res) => {
                this.profile = res.data.data;
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>