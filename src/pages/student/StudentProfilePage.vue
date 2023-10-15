<template>
    <div>
        <div  v-if="showImage" class="fixed w-5/6 sm:w-[450px] sm:h-[450px] shadow-xl z-50 top-1/2 left-1/2" style="transform: translate(-50% , -50%);" >
            <span @click="showImage = false" class="absolute px-2 font-bold text-white rounded-full cursor-pointer right-2 top-2 bg-green">x</span>
            <img  v-if="profile && profile.image" :src="filePath.imagePath(profile.image)" class=" sm:w-[450px] sm:h-[450px] rounded"  alt="">
        </div>
        <div v-if="profile" class="py-6 sm:flex" :class="showImage ? 'blur-[2px]' : ''">
            <img @click="showImage = true" v-if="profile && profile.image" :src="filePath.imagePath(profile.image)" style="height : 220px;width : 220px;" class="mx-16 border-8 rounded-full cursor-pointer sm:my-8 border-teal" alt="">
            <img v-else src="" style="height : 220px;width : 220px;" class="mx-16 border-8 rounded-full border-teal sm:my-8 sm:mx-16 sm:px-6 " alt="">
            <div class="sm:w-[70%]">
                <h1 class="px-8 py-4 text-3xl font-bold sm:px-12 sm:py-8 sm:mt-4 sm:mx-1">{{ profile.name }}</h1>
                <p class="font-semibold px-8 py-1 text-lg sm:px-1.5 sm:mx-12">Student ID - [ <span class="text-green">{{ profile.student_id }}</span> ]</p>
                <p class="font-semibold text-lg px-8 py-1 sm:my-6 sm:px-1.5 sm:mx-12">Joined at -[ <span class="text-green">{{ profile.created_at }}</span> ]</p>
            </div>
        </div>
<!-- for responsive that I can do as much as I can hee" -->
       <div class="w-full py-12 sm:hidden"  :class="showImage ? 'blur-[3px]' : ''">
            <button @click="showInfo" class="w-1/2 py-1 " :class="info ? 'bg-blue-2 text-white': 'bg-white text-gray'">Personal Information</button>
            <button @click="showActivity" class="w-1/2 py-1" :class="show_activities ? 'bg-blue-2 text-white': 'bg-white text-gray'">Activities</button>
        <form v-if="info && profile" class="mx-1 my-6" @submit.prevent="editProfile">
              <div class="flex justify-end">
                <p @click="editing" v-if="saving" class="px-4 mt-2 underline text-end text-blue-2">Edit</p>
                <button  v-if="isEditing" class="px-4 mt-2 underline text-end text-blue-2">Save</button>
              </div>            
              <div class="mt-6 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                    <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">EMAIL ADDRESS</p>
                    <input v-model="profile.email" disabled type="email"   class="py-4 px-4 w-[60%] outline-none">
                </div> 
                <div class="flex border border-b-0 border-gray-2">
                    <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">PHONE NUMBER</p>
                    <input :disabled="!isEditing" v-model="profile.phone" type="text" class="py-4 px-4 w-[60%] outline-none">
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">EDUCATION</p>
                        <input :disabled="!isEditing" v-model="profile.education" type="text" class="py-4 px-4 w-[60%] outline-none">
                </div>   
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">DATE OF BIRTH</p>
                        <input :disabled="!isEditing" v-model="profile.date_of_birth" type="date" class="py-4 px-4 w-[60%] outline-none" >
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-4 text-center border-r font-semibold text-xs border-gray-2 w-[40%]">ADDRESS</p>
                        <input :disabled="!isEditing" v-model="profile.address" type="text" class="py-4 px-4 w-[60%] outline-none">
                </div>
            </div>
        </form>
        <div v-if="show_activities" class="w-full">
                <div class="mx-1 my-16 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-5 text-xs px-3 font-semibold text-center border-r border-gray-2 w-[40%]">IN-PROGRESS COURSES</p>
                        <p class="py-5 text-center text-xs font-semibold px-4 w-[60%]">{{ profile.id_progess_course_count }}</p>
                </div>     
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-6 px-3 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">COMPLETED COURSES</p>
                        <p class="py-6 text-xs font-semibold text-center px-4 w-[60%]">{{ profile.course_completion_count }}</p>
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-6 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">ACHIEVEMENTS</p>
                        <p class="py-6 text-xs font-semibold px-4 w-[60%]"></p>
                </div>                      
            </div>
        </div>
        </div>
<!--  -->
        <div class="flex justify-around pb-16 max-sm:hidden"  :class="showImage ? 'blur-[3px]' : ''">
            <div class="sm:w-[45%] sm:mt-6">
                <p class="font-semibold underline text-blue-2">Personal information</p>
                <form v-if="info && profile " class="bg-white " @submit.prevent="editProfile">
                <div class="flex justify-end">
                    <p @click="editing" v-if="saving" class="px-4 underline text-end text-blue-2">Edit</p>
                    <button v-if="isEditing" class="px-4 underline text-end text-blue-2">Save</button>
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">EMAIL ADDRESS</p>
                        <input v-model="profile.email" disabled type="email"  class="py-1.5 px-4 outline-none w-[60%]">
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">PHONE NUMBER</p>
                        <input :disabled="!isEditing" v-model="profile.phone" type="text" class="py-1.5 px-4 outline-none w-[65%]">
                </div>
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">EDUCATION</p>
                        <input :disabled="!isEditing" v-model="profile.education" type="text" class="py-1.5 px-4 outline-none w-[65%]">
                </div>   
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">DATE OF BIRTH</p>
                        <input :disabled="!isEditing" v-model="profile.date_of_birth"  type="date" class="py-1.5 px-4 outline-none w-[65%]">
                </div>
                <div class="flex border border-b border-gray-2">
                        <p class="py-1.5 text-center border-r font-semibold text-sm border-gray-2 w-[35%]">ADDRESS</p>
                        <input :disabled="!isEditing" v-model="profile.address" class="py-1.5 px-4 w-[65%] outline-none">
                </div>
                </form>
            </div>
            <div class="w-[45%] mt-6">
                <p class="font-semibold underline text-blue-2">Activites</p>
                <div class="mt-6 bg-white">
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-5 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">IN-PROGRESS COURSES</p>
                        <p class="py-5 text-center text-xs font-semibold px-4 w-[60%]">{{ profile.id_progess_course_count }}</p>
                </div>     
                <div class="flex border border-b-0 border-gray-2">
                        <p class="py-6 text-xs font-semibold text-center border-r border-gray-2 w-[40%]">COMPLETED COURSES</p>
                        <p class="py-6 text-xs font-semibold text-center px-4 w-[60%]">{{ profile.course_completion_count }}</p>
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
                showImage : false,
                filePath : filePath,
                show_activities : false,
                activities : [],
                isEditing : false,
                saving : true,
            }
        },
        methods: {
            showInfo() {
                this.info = true,
                this.show_activities = false               
            },
            showActivity() {
                this.info = false,
                this.show_activities = true
            },
            editing(){
                this.saving = false,
                this.isEditing = true
            },
            editProfile(){
                let obj = {
                    phone : this.profile.phone,
                    address : this.profile.address,
                    education : this.profile.education,
                    date_of_birth : this.profile.date_of_birth
                }
                ApiService.patch(`student/user/${this.profile.id}`, obj).then((res) =>{
                   console.log(res); 
                }).catch((res) => {
                    console.log(res);
                })
                this.saving = true,
                this.isEditing = false

            }
        },
        async mounted(){
            await ApiService.get('student/user').then((res) => {
                this.profile = res.data;
                console.log(res.data);
            }).catch((res) => {
                console.log(res);
            })
            // await ApiService.get(`student/course-per-students/${this.profile.id}`).then((res) => {
            //     this.activities = res.data.data;
            // })


        }
    }
</script>

<style scoped>

</style>