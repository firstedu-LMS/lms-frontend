<template>
    <div class="bg-white">
        <router-link to="/">
            <img class="w-1/3 mx-auto" :src="logo" alt="">
        </router-link>
        <ul class="py-2 mx-2 border-b-2 border-gray">
            <li v-for="item in items" :key="item.name">
                <router-link active-class="text-white bg-blue-2 hover:text-blue" class="flex items-center w-full my-1 py-1.5 px-6 hover:text-blue-2" :to="{name : item.path}">
                    <span class="material-icons-sharp" style="font-size: 20px;">{{ item.icon }}</span> 
                    &nbsp;{{ item.name }}
                </router-link>
            </li>
        </ul>
        <ul class="py-2 mx-6">
            <li class="flex items-center m-2">
                <span class="material-icons-sharp" style="font-size: 20px;">settings</span>
                <router-link class="hover:text-blue-2" to="/admin">&nbsp;&nbsp;Settings</router-link>
            </li>
            <li class="flex items-center m-2 my-4">
                <span class="material-icons-sharp">logout</span>
                <button class="hover:text-red">&nbsp;&nbsp;Logout</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                logo : './images/layout/logo.png',
                items : [
                    {
                        name : 'Dashboard',
                        path : 'AdminDashboardPage',
                        icon : 'interests'
                    },
                    {
                        name : 'Courses',
                        path : 'HC_Page',
                        icon : 'interests'
                    },
                    {
                        name : 'Instructors',
                        path : 'HC_Page',
                        icon : 'group'
                    },
                    {
                        name : 'Students',
                        path : 'HC_Page',
                        icon : 'groups'
                    },
                    {
                        name : 'Lessons',
                        path : 'HC_Page',
                        icon : 'auto_stories'
                    },
                    {
                        name : 'Careers',
                        path : 'HJ_Page',
                        icon : 'work'
                    },
                    {
                        name : 'Application Forms',
                        path : 'HC_Page',
                        icon : 'contacts'
                    },
                    {
                        name : 'Certificates',
                        path : 'HC_Page',
                        icon : 'verified_user'
                    }
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>