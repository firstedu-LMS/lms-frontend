<template>
    <div>
        <HPNavbar/>
        <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
        </div>
        <div class="flex justify-center mt-6 sm:items-center sm:mx-20 sm:shadow-xl">
            <img src="@/assets/images/layout/auth.jpg" class="hidden w-2/3 sm:block" alt="">
            <form @submit.prevent="login" class="p-2 mb-24 sm:w-1/3">
                <h1 class="text-2xl font-semibold text-center text-blue-2">Login Your Account</h1>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Email</label>
                    <input v-model="form.email" required type="email"  class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5">
                    <p v-if="error.email" class="py-1 text-sm text-red">{{ error.email }}</p>
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Password</label>
                    <input v-model="form.password" required type="password"  class="w-full mt-1 outline-none bg-transparent px-2 py-0.5 border">
                    <p v-if="error.password" class="py-1 text-sm text-red">{{ error.password}}</p>
                </div>
                <div  class="px-4 py-2 mt-4">
                    <button :disabled="loading" class="w-full py-1 text-lg text-white bg-blue-2">Login</button>
                </div>
                <div  class="px-4 py-2 mt-4">
                    <p class="">Doesn't have an account? <router-link class="text-blue-2" :to="{name : 'RegisterPage'}">Sign Up</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import HPNavbar from '@/layouts/public/HPNavbar.vue';
import TokenService from '@/services/TokenService';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
    export default {
        components : {
            HPNavbar
        },
        data(){
            return {
                authStore : useAuthStore(),
                error : {},
                form : {
                    email : '',
                    password : '',
                },
                loading : false
            }
        },
        methods : {
            login () {
                this.loading = true
                axios.post('login' , this.form).then((res) => {
                    TokenService.setToken(res.data.data.token)
                    this.authStore.setAuth(res.data.data);
                    this.loading = false
                    console.log(res);
                    console.log(this.authStore.roles);
                    if (this.authStore.authenticated && this.authStore.roles[0].name == 'admin') {
                        this.$router.replace({name : 'AdminDashboardPage'});
                    } else if (this.authStore.authenticated && this.authStore.roles[0].name == 'student') {
                        this.$router.replace({name : 'StudentProfilePage'});
                    }  else if (this.authStore.authenticated && this.authStore.roles[0].name == 'instructor') {
                        this.$router.replace({name : 'InstructorProfilePage'});
                    }
                }).catch((res) => {
                    console.log(res);
                    this.loading = false;
                    if(res.response && res.response.data.errors) {
                        this.error = res.response.data.errors;
                        setTimeout(() => {
                            this.error = {};
                        } , 3000)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>