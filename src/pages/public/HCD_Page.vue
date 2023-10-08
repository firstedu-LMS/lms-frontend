<template>
  <div>
    <HPNavbar />
    <transition name="dialog" class="my-24">
          <dialog v-if="created" class="fixed z-50 flex flex-col items-center p-6 text-gray" style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
              <span style="color: #22c55e; font-size: 6rem;" class="material-icons-sharp">check_circle</span>
              <p class="my-6 text-xl">Course Has Been Created Successfully.</p>
              <button @click="created = false" class="w-full py-1.5 text-white rounded hover:bg-transparent hover:text-green border border-green bg-green">Okay</button>
          </dialog>
      </transition>
      <transition name="dialog" class="my-24">
          <dialog v-if="error" class="fixed z-50 flex flex-col items-center p-6 text-gray" style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
              <span style="color: rgb(228, 32, 32); font-size: 6rem;" class="material-icons-sharp">error</span>
              <p class="my-6 text-xl">You have already enrolled this course.</p>
              <button @click="error = false" class="w-full py-1.5 text-white rounded hover:bg-transparent hover:text-red border border-red bg-red">Okay</button>
          </dialog>
      </transition>
    <div :class="created ? 'blur-[1px]' : error ? 'blur-[1px]' : ''"  class="justify-between sm:w-[80%] p-2 mt-6 mx-auto sm:mb-0 sm:flex">
      <div class="sm:w-1/2">
        <h1 class="mb-6 text-3xl font-bold text-blue">{{ course.name }}</h1>
        <p class="my-4" v-html="course.description"></p>
      </div>

      <ul class="m-10 mb-0 text-center sm:w-1/4 sm:mt-0">
        <li class="text-white bg-indigo">Summary</li>
        <li>Available age - over {{ course.age }}</li>
        <li>Fee - {{ course.fee }}</li>
        <li>Status - {{ course.status }}</li>
        <li v-if="course.available" class="text-green">Available Now</li>
        <li v-else class="text-red">Temporarily Closed</li>
      </ul>
    </div>
    <div class="p-4 text-lg text-white sm:w-[80%] mx-auto">
        <button @click="enrollCourse(course.id)" class="px-6 py-1 mr-2 bg-green">Enroll now</button>
        <router-link :to="{name : 'HC_Page'}" class="px-4 py-2 bg-gray">Back</router-link>
    </div>
  </div>
</template>

<script>
import HPNavbar from "@/layouts/public/HPNavbar.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/services/ApiService";
export default {
  components: {
    HPNavbar,
  },
  data() {
    return {
      created : false,
      error : false,
      course: {},
      id: this.$route.params.id,
      authStore : useAuthStore()
    };
  },
  methods : {
    async enrollCourse(id) {
      await this.authStore.getUser();
      let isStudent = this.authStore.roles.find((role) => role.name == 'student');
      if (isStudent && this.authStore.user.student) {
        let obj = {
          course_id : id,
          student_id : this.authStore.user.student.id
        } 
        ApiService.post('enrollments' , obj).then(() => {
          this.created = true;
        }).catch((res) => {
          console.log(res);
          this.error = true;
        })
      } else {
        alert(`You are ${this.authStore.roles[0].name}. You can't enroll this course!`)
      }
    }
  },
  mounted() {
    axios
      .get(`/courses/${this.id}`).then((res) => {
        this.course = res.data.data;
      }).catch((res) => {
        alert("Error!");
        console.log(res);
      });
  },
};
</script>

<style scoped>
li {
  font-weight: 600;
  padding: 0.5rem 1rem;
  text-align: center;
  border: 1px solid gray;
}
.dialog-enter-from , .dialog-leave-to {
  transform: scale(90%)
}
.dialog-enter-active , .dialog-leave-active {
  transition: all 0.2s ease-out;
}
</style>