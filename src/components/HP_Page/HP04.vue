<template>
    <div>
        <h1 class="py-6 text-2xl font-bold text-center">Courses</h1>
        <div class="justify-around text-white sm:flex">
            <div v-for="course in courses" :key="course.name" class="pb-2 my-4 sm:w-1/5 sm:my-0 bg-blue">
                <img :src="course.image" class="w-full" alt="">
                <h1 class="p-2 mb-3 font-semibold">{{ course.name }}</h1>
                <router-link :to="{name : course.path.name }" class="block py-1 mx-2 text-center hover:bg-cyan-2 bg-cyan">
                    Show  Detail
                </router-link>
            </div>
        </div>
        <p class="mt-6 text-center">
            <router-link :to="{name : 'HP_Page'}">see more <svg class="inline" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow"><path d="M15.71,12.71a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-3-3a1,1,0,0,0-1.42,1.42L12.59,11H9a1,1,0,0,0,0,2h3.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0ZM22,12A10,10,0,1,0,12,22,10,10,0,0,0,22,12ZM4,12a8,8,0,1,1,8,8A8,8,0,0,1,4,12Z"></path></svg>
            </router-link>
        </p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                courses : [
                    {
                        image : './images/HP03/song.jpg',
                        name : 'Fundamental Computer Class',
                        path : {
                            name : 'HP_Page',
                        }
                    },
                    {
                        image : './images/HP03/song.jpg',
                        name : 'Advanced Excel',
                        path : {
                            name : 'HP_Page',
                        }
                    },
                    {
                        image : './images/HP03/song.jpg',
                        name : 'Web Development',
                        path : {
                            name : 'HP_Page',
                        }
                    },
                    {
                        image : './images/HP03/song.jpg',
                        name : 'Networking (CCNA)',
                        path : {
                            name : 'HP_Page',
                        }
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>