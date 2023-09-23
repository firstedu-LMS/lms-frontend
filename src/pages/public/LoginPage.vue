<template>
    <div>
        <HPNavbar/>
        <div class="flex justify-center mt-6 sm:items-center sm:mx-20 sm:shadow-xl">
            <img :src="image" class="hidden w-2/3 sm:block" alt="">
            <form @submit.prevent="login" class="p-2 mb-24 sm:w-1/3">
                <h1 class="text-2xl font-semibold text-center text-blue-2">Login Your Account</h1>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Email</label>
                    <input v-model="form.email" required type="email"  class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5">
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Password</label>
                    <input v-model="form.password" required type="password"  class="w-full mt-1 outline-none bg-transparent px-2 py-0.5 border">
                </div>
                <div  class="px-4 py-2 mt-4">
                    <button class="w-full py-1 text-lg text-white bg-blue-2">Login</button>
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
                image : './images/layout/auth.jpg',
                form : {
                    email : '',
                    password : '',
                }
            }
        },
        methods : {
            login () {
                axios.post('login' , this.form).then((res) => {
                    TokenService.setToken(res.data.data.token)
                    this.authStore.setAuth(res.data.data);
                    if (this.authStore.authenticated && this.authStore.roles[0].name == 'admin') {
                        this.$router.push({name : 'AdminDashboardPage'});
                    } else if (this.authStore.authenticated && this.authStore.roles[0].name == 'student') {
                        this.$router.push({name : 'StudentProfilePage'});
                    }
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>