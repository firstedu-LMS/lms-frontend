<template>
  <div>
    <HPNavbar />
    <div class="justify-between sm:w-[80%] p-2 mt-6 mx-auto sm:mb-0 sm:flex">
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
      course: {},
      id: this.$route.params.id,
      authStore : useAuthStore()
    };
  },
  methods : {
    async enrollCourse(id) {
      ApiService.get('/user').then(res => {
        this.authStore.setAuth(res.data)
        let isStudent = this.authStore.roles.find((role) => role.name == 'student');
        if (isStudent) {
          console.log(isStudent);
          let obj = {
            course_id : id,
            student_id : this.authStore.user.id
          } 
          ApiService.post('student/enrollments' , obj).then((res) => {
            console.log(res);
          }).catch((res) => {
            console.log(res);
          })
        } else {
          alert(`You are ${this.authStore.roles[0].name}. You can't enroll this course!`)
        }
      }).catch(() => {
        this.$router.push({name : 'LoginPage'});
      })
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
</style>