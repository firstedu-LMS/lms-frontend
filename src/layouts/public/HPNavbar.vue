<template>
    <div class="flex items-center justify-between px-4 py-2 bg-white shadow sm:px-8">
        <div class="w-1/4">
            <router-link to="/">
                <img class="h-12" src="@/assets/images/layout/logo.png" alt="">
            </router-link>
        </div>
        <ul class="justify-around hidden w-1/2 px-6 pt-1 font-semibold sm:flex">
            <li v-for="item in items" :key="item.name">
                <router-link :to="{name : item.path}">{{ item.name }}</router-link>
            </li>
        </ul>
        <div class="flex justify-end w-1/4">
            <button class="mr-2 sm:hidden">
                <span class="material-icons-sharp" style="font-size: 36px;margin: 5px 0px;">menu</span>
            </button>
            <button @click="navigate">
                <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#1C274C"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

    export default {
        data () {
            return {
                logo : './images/layout/logo.png',
                authStore : useAuthStore(),
                items : [
                    {
                        name : 'Home',
                        path : 'HP_Page'
                    },
                    {
                        name : 'Courses',
                        path : 'HC_Page'
                    },
                    {
                        name : 'Career',
                        path : 'HJ_Page'
                    },
                ]
            }
        },
        methods : {
            async navigate() {
                await this.authStore.getUser();
                if (this.authStore.roles.length && this.authStore.roles[0].name == 'admin') {
                    this.$router.push({name : 'AdminDashboardPage'})
                } else if (this.authStore.roles.length && this.authStore.roles[0].name == 'student') {
                    this.$router.push({name : 'StudentProfilePage'})
                } else if (this.authStore.roles.length && this.authStore.roles[0].name == 'instructor') {
                    this.$router.push({name : 'InstructorProfilePage'})
                } else {
                    this.$router.push({name : 'LoginPage'})
                }
            }
        }
    }
</script>

<style scoped>

</style>