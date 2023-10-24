<template>
    <div>
        <HPNavbar/>
        <div class="flex justify-center mt-6 sm:items-center sm:mx-20 sm:shadow-xl">
            <img :src="image" class="hidden w-2/3 sm:block" alt="">
            <form @submit.prevent="register" class="p-4 sm:w-1/3">
                <h1 class="text-2xl font-semibold text-center text-blue-2">Register Here</h1>
                <div class="px-4 py-2">
                    <label for="" class="text-sm font-semibold">Name</label>
                    <input required v-model="form.name"  type="text" class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5">
                    <p v-if="error.name" class="text-red">{{ error.name[0] }}</p>
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold">Profile Picture</label>
                    <input @change="saveImage" type="file" class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5 file:bg-transparent file:border-0">
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Email</label>
                    <input required v-model="form.email"  type="email"  class="w-full mt-1 outline-none bg-transparent border px-2 py-0.5">
                    <p v-if="error.email" class="text-red">{{ error.email[0] }}</p>
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Password</label>
                    <input required v-model="form.password"  type="password"  class="w-full mt-1 outline-none bg-transparent px-2 py-0.5 border">
                    <p v-if="error.password" class="text-red">{{ error.password[0] }}</p>
                </div>
                <div  class="px-4 py-2">
                    <label for="" class="text-sm font-semibold ">Confirm Your Password</label>
                    <input v-model="form.password_confirmation" required type="password"  class="w-full mt-1 outline-none bg-transparent px-2 py-0.5 border">
                    <p v-if="error.password" class="py-1  text-red">{{ error.password[0] }}</p>
                </div>
                <div  class="px-4 py-2 mt-4">
                    <button :disabled="uploading || loading" class="w-full py-1 text-lg text-white bg-blue-2">Register</button>
                </div>
                <div  class="px-4 py-2 mt-4">
                    <p class="">Already have an account? <router-link class="text-blue-2" :to="{name : 'LoginPage'}">Sign In</router-link></p>
                </div>
            </form>
            <div v-if="loading" style="transform: translate(-50%,-50%);" class="fixed z-50 top-1/2 left-1/2">
            loading . . .
            </div>
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
                uploading : false,
                error : {},
                form : {
                    name : '',
                    image_id : null,
                    email : '',
                    password : '',
                    password_confirmation : '',
                },
                loading : false
            }
        },
        methods : {
            saveImage(e) {
                this.uploading = true;
                let form = new FormData();
                form.set('user_image' , e.target.files[0])
                this.loading = true
                axios.post('register/profile' , form).then((res) => {
                    console.log(res.data.data);
                    this.form.image_id = res.data.data.id;
                    this.uploading = false;
                    this.loading = false
                }).catch((res) => {
                    console.log(res);
                })
            },
            register () {
                this.uploading = true;
                this.loading = true
                axios.post('register' , this.form).then((res) => {
                    TokenService.setToken(res.data.data.token)
                    this.loading = false
                    this.$router.push({name : "LoginPage"});
                }).catch((res) => {
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