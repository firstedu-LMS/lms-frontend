<template>
  <div>
    <HPNavbar />
    <SuccessDialog :message="`Enrolled course successfully. You will get access to this course shortly`" @reload="navigate" v-if="created" />
    <ErrorDialog :message="`You have already enrolled this course.`" @reload="reload" v-if="error" />
      <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
        </div>
    <div :class="created || loading ? 'blur-[1px]' : error ? 'blur-[1px]' : ''"  class="justify-between sm:w-[80%] p-2 mt-6 mx-auto sm:mb-0 sm:flex">
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
        <button :disabled="loading" @click="enrollCourse(course.id)" class="px-6 py-1 mr-2 bg-green">Enroll now</button>
        <button @click="$router.go(-1)" class="px-4 py-1 bg-gray">Back</button>
    </div>
  </div>
</template>

<script>
import HPNavbar from "@/layouts/public/HPNavbar.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/services/ApiService";
import SuccessDialog from "@/components/dialog/SuccessDialog.vue";
import ErrorDialog from "@/components/dialog/ErrorDialog.vue";
export default {
  components: {
    HPNavbar, SuccessDialog , ErrorDialog
  },
  data() {
    return {
      loading : false,
      created : false,
      error : false,
      course: {},
      id: this.$route.params.id,
      authStore : useAuthStore()
    };
  },
  methods : {
    navigate() {
      this.$router.push({name : 'StudentCoursePage'})
    },
    reload() {
      this.created = false;
      this.error = false;
    },
    async enrollCourse(id) {
      await this.authStore.getUser();
      let isStudent = this.authStore.roles.find((role) => role.name == 'student');
      if (isStudent && this.authStore.user.student) {
        let obj = {
          course_id : id,
          student_id : this.authStore.user.student.id
        } 
        this.loading = true;
        ApiService.post('enrollments' , obj).then(() => {        
          this.created = true;
          this.loading = false
        }).catch((res) => {
          this.loading = false
          console.log(res);
          this.error = true;
        })
      } else {
        // alert(`You are ${this.authStore.roles[0].name}. You can't enroll this course!`)
        this.$router.push({name : 'LoginPage'})
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