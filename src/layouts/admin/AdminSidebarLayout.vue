<template>
    <div id="side" class="bg-white">
        <router-link to="/">
            <img class="w-1/3 m-1 mx-auto" src="../../../public/images/layout/logo.png" alt="">
        </router-link>
        <ul class="py-2 mx-2 text-sm border-b-2 border-gray">
            <li>
                <router-link class="flex items-center w-full my-1.5 py-1.5 px-3 hover:text-blue-2" :to="{name : 'AdminDashboardPage'}">
                    <span class="material-icons-sharp" style="font-size: 20px;">apps</span> 
                    &nbsp;Dashboard
                </router-link>
            </li>
            <li v-for="item in items" :key="item.name">
                <router-link active-class="text-white bg-blue-2 hover:text-white" class="flex items-center w-full px-3 py-4 hover:text-blue-2" :to="{name : item.path}">
                    <span class="material-icons-sharp" style="font-size: 20px;">{{ item.icon }}</span> 
                    &nbsp;{{ item.name }}
                </router-link>
            </li>
        </ul>
        <ul class="py-2 mx-2">
            <li>
                <router-link class="flex items-center w-full my-1 py-1.5 px-4 hover:text-blue-2" to="/admin">
                    <span class="material-icons-sharp" style="font-size: 20px;">settings</span>
                    &nbsp;&nbsp;Settings
                </router-link>
            </li>
            <li>
                <button @click="logout" class="flex items-center w-full my-1 py-1.5 px-4 text-red">
                    <span  class="material-icons-sharp">logout</span>
                    &nbsp;&nbsp;Logout
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import { useAuthStore } from '@/stores/auth'
    export default {
        data(){
            return {
                authStore : useAuthStore(),
                items : [
                    {
                        name : 'Courses',
                        path : 'AdminCoursePage',
                        icon : 'interests'
                    },
                    {
                        name : 'Instructors',
                        path : 'AdminInstructorPage',
                        icon : 'group'
                    },
                    {
                        name : 'Enrollments',
                        path : 'AdminEnrollmentPage',
                        icon : 'groups'
                    },
                    {
                        name : 'Careers',
                        path : 'AdminCareerPage',
                        icon : 'work'
                    },
                    {
                        name : 'Application Forms',
                        path : 'AdminApplicationPage',
                        icon : 'contacts'
                    },
                    {
                        name : 'Certificates',
                        path : 'HC_Page',
                        icon : 'verified_user'
                    }
                ],
            }
        },
        methods:{
            logout(){
            ApiService.post('logout').then(()=>{  
                this.authStore.destroyAuth()         
                this.$router.push('/')
        }).catch(err=>console.log(err));
    }
        }
    }
</script>

<style lang="scss" scoped>

</style>