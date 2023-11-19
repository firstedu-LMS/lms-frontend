<template>
  <div class="text-gray-1">
    <div v-if="previewImg" @click.self="previewImg = !previewImg" class="fixed top-0 left-0 z-50 w-screen h-screen p-4 bg-opacity-90 bg-gray-2">
        <img :src="filePath.imagePath(profile.image)" class="absolute w-11/12 rounded sm:w-1/3 top-1/2 left-1/2" style="transform: translate(-50% , -50%);" alt="">
    </div>
    <div class="z-10 flex flex-wrap items-center justify-center py-12">
        <div class="flex justify-center w-full sm:w-[45%]">
            <img @click="previewImg = true" :src="filePath.imagePath(profile.image)" class="cursor-pointer w-[240px] h-[240px] rounded-full border-[0.4rem] border-green" alt="">
        </div>
        <div class="w-full sm:w-[45%] sm:p-0 p-3 mt-6 sm:mt-0">
            <h1 class="text-3xl font-semibold">{{ profile.name }}</h1>
            <h3 class="my-4 text-xl font-semibold">Student Id  &raquo; [ <span class="text-green">{{ profile.student_id }}</span> ]</h3>
            <h3 class="my-4 text-xl font-semibold">Joined at  &raquo; [ <span class="text-green">{{ profile.created_at }}</span> ]</h3>
        </div>
    </div>
    <div class="w-full sm:flex justify-evenly bg-[#f2efef]">
        <div class="w-full sm:w-[45%] px-1 pt-4 pb-8">
            <h1 class="font-semibold underline text-blue-2">PERSONAL INFORMATIONS</h1>
            <button @click="editing = true" v-if="!editing" class="float-right text-blue-2">edit</button>
            <form class="text-sm">
                <button v-if="editing" class="float-right ml-4 text-blue-2">save</button>
                <span v-if="editing" @click="editing = false" class="float-right cursor-pointer text-blue-2">cancel</span>
                <div :class="classes.inputGroups">
                    <label :class="classes.labels" for="email">EMAIL ADDRESS</label>
                    <input :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.email">
                </div>
                <div :class="classes.inputGroups">
                    <label :class="classes.labels" for="email">PHONE NUMBER</label>
                    <input :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.phone">
                </div>
                <div :class="classes.inputGroups">
                    <label :class="classes.labels" for="email">EDUCATION</label>
                    <input :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.education">
                </div>
                <div :class="classes.inputGroups">
                    <label :class="classes.labels" for="email">DATE OF BIRTH</label>
                    <input :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.date_of_birth">
                </div>
                <div :class="classes.inputGroups">
                    <label :class="classes.labels" for="email">ADDRESS</label>
                    <textarea rows="2" :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.address">
                    </textarea>
                </div>
            </form>
        </div>
        <div class="w-full sm:w-[45%] px-1 pt-4 pb-8">
            <h1 class="font-semibold underline text-blue-2">ACTIVITIES</h1>
            <button class="float-right text-[#f2efef]">.</button>
            <div class="text-sm">
                <div :class="classes.inputGroups">
                    <p :class="classes.labels">IN PROGRESS COURSES</p>
                    <p :class="classes.inputs" class="text-center">{{ profile.in_progess_course_count }}</p>
                </div>
                <div :class="classes.inputGroups">
                    <p :class="classes.labels">COMPLETED COURSES</p>
                    <p :class="classes.inputs" class="text-center">{{ profile.course_completion_count }}</p>
                </div>
                <div :class="classes.inputGroups">
                    <p :class="classes.labels">ACHIEVEMENTS</p>
                    <p :class="classes.inputs" class="text-center">{{ profile.achievement_count }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";
import filePath from "@/services/public/filePath";
export default {
    data() {
    return {
        classes : {
            inputGroups : 'border bg-white flex w-full border-[#f2efef]',
            labels : 'w-[40%] p-2 border-r block border-[#f2efef] text-sm',
            inputs : 'w-[60%] p-2 bg-transparent outline-none'
        },
        editing : false,
        profile: "",
        filePath: filePath,
        previewImg : false,
    };
    },
    mounted() {
        ApiService.get("students/user").then((res) => {
            this.profile = res.data;
            console.log(this.profile);
            }).catch((res) => {
            console.log(res);
            });
    }
};
</script>

<style scoped>
</style>