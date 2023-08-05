<template>
    <div class="bg-white">
        <router-link to="/">
            <img class="w-1/3 m-1 mx-auto" src="../../../public/images/layout/logo.png" alt="">
        </router-link>
        <ul class="py-2 mx-2 border-b-2 border-gray">
            <li>
                <router-link class="flex items-center w-full my-1.5 py-1.5 px-3 hover:text-blue-2" :to="{name : 'AdminDashboardPage'}">
                    <span class="material-icons-sharp" style="font-size: 20px;">apps</span> 
                    &nbsp;Dashboard
                </router-link>
            </li>
            <li v-for="item in items" :key="item.name">
                <router-link active-class="text-white bg-blue-2 hover:text-white" class="flex items-center w-full my-1.5 py-1.5 px-3 hover:text-blue-2" :to="{name : item.path}">
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
                <button class="flex items-center w-full my-1 py-1.5 px-4 text-red">
                    <span class="material-icons-sharp">logout</span>
                    &nbsp;&nbsp;Logout
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                items : [
                    {
                        name : 'Courses',
                        path : 'HC_Page',
                        icon : 'interests'
                    },
                    {
                        name : 'Instructors',
                        path : 'AdminInstructorPage',
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
        }
    }
</script>

<style lang="scss" scoped>

</style>