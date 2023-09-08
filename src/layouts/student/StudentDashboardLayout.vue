<template>
    <div>
        <div class="w-5/6 ">
            <nav class="flex items-center justify-between px-2 bg-red">
                <img src="/images/layout/logo.png" class="w-24 p-2" alt="">
                <span class="material-icons-sharp">notifications</span>
            </nav>
            <main class="bg-blue-2">
                <router-view></router-view>
            </main>
        </div>
        <div class="fixed top-0 right-0 w-1/6 h-screen bg-green">
            
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                sideItem : [
                    {
                        name : 'Profile',
                        path : 'StudentProfilePage'
                    },
                    {
                        name : 'Profile',
                        path : 'StudentProfilePage'
                    },
                    {
                        name : 'Profile',
                        path : 'StudentProfilePage'
                    },
                    {
                        name : 'Profile',
                        path : 'StudentProfilePage'
                    },
                    {
                        name : 'Profile',
                        path : 'StudentProfilePage'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>