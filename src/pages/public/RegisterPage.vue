<template>
    <div>
        <HPNavbar/>
        <div class="flex justify-center mt-6 sm:items-center sm:mx-20 sm:shadow-xl">
            <img :src="image" class="hidden w-2/3 sm:block" alt="">
            <form @submit.prevent="register" class="p-4 sm:w-1/3">
                <h1 class="text-2xl font-semibold text-center text-blue-2">Register Here</h1>
                <div class="px-4 py-2">
                    <label for="" class="text-sm font-semibold">Name</label>
                    <input v-model="form.name" required type="text" class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5">
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold">Profile Picture</label>
                    <input type="file" class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5 file:bg-transparent file:border-0">
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Email</label>
                    <input v-model="form.email" required type="email"  class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5">
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Password</label>
                    <input v-model="form.password" required type="password"  class="w-full mt-1 outline-none bg-transparent px-2 py-0.5 border">
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Confirm Your Password</label>
                    <input v-model="form.password_confirmation" required type="password"  class="w-full mt-1 outline-none bg-transparent px-2 py-0.5 border">
                </div>
                <div  class="px-4 py-2 mt-4">
                    <button class="w-full py-1 text-lg text-white bg-blue-2">Register</button>
                </div>
                <div  class="px-4 py-2 mt-4">
                    <p class="">Already have an account? <router-link class="text-blue-2" :to="{name : 'LoginPage'}">Sign In</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import HPNavbar from '@/layouts/public/HPNavbar.vue'
import TokenService from '@/services/TokenService'
import axios from 'axios'
    export default {
        components : {
            HPNavbar
        },
        data(){
            return {
                image : './images/layout/auth.jpg',
                form : {
                    name : '',
                    image_id : null,
                    email : '',
                    password : '',
                    password_confirmation : '',
                }
            }
        },
        methods : {
            register () {
                axios.post('register' , this.form).then((res) => {
                    TokenService.setToken(res.data.data.token)
                    this.$router.go(-1)
                }).catch((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>