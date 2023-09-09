<template>
    <div>
        <div class="sm:flex my-8">
            <img src="../../../public/images/HP03/people.png" style="height : 220px;width : 220px;" class="rounded-full mx-16 border-teal border-8 sm:my-8 sm:mx-16 sm:px-6 " alt="">
            <div class="sm:w-[70%]">
                <h1 class="sm:px-12 px-8 py-4 sm:py-8 sm:mt-4 sm:mx-1 font-bold text-3xl">Emma Waston</h1>
                <p class="font-semibold px-8 py-1 text-lg sm:px-1.5 sm:mx-12">Student ID</p>
                <p class="font-semibold text-lg px-8 py-1 sm:my-6 sm:px-1.5 sm:mx-12">Joined at</p>
            </div>
        </div>
<!-- for responsive that I can do as much as I can hee" -->
       <div class="w-full sm:hidden bg-gray-2">
            <button @click="showInfo" class=" py-1 w-1/2 items-center" :class="info ? 'bg-blue-2 text-white': 'bg-white text-gray'">Personal Information</button>
            <button @click="showActivity" class="py-1 w-1/2 items-center" :class="activities ? 'bg-blue-2 text-white': 'bg-white text-gray'">Activities</button>
        <div v-if="info" class="my-6 mx-1">
              <div class="bg-white mt-6">
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
                <div class="bg-white my-6 mx-1">
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
                <p class="text-blue-2 font-semibold underline">Personal information</p>
                <div class="bg-white mt-6">
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
                <p class="text-blue-2 font-semibold underline">Activites</p>
                <div class="bg-white mt-6">
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
    export default {
        data() {
            return {
                info: true,
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
        }
    }
</script>

<style scoped>

</style>