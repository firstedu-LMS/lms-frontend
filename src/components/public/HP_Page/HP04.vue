<template>
    <div>
        <h1 class="py-6 text-2xl font-bold text-center">Latest Courses</h1>
        <div class="justify-around text-white sm:flex">
            <div v-for="course in courses" :key="course.name" class="pb-2 my-4 sm:w-1/5 sm:my-0 bg-blue">
                <img :src="course.image" class="w-full" alt="">
                <h1 class="p-2 mb-3 text-xl font-semibold">{{ course.name }}</h1>
                <router-link :to="{name : course.path.name }" class="block py-1 mx-6 text-center sm:mx-2 hover:bg-cyan-2 bg-cyan">
                    Show  Detail
                </router-link>
            </div>
        </div>
        <p class="mt-6 text-center">
            <router-link :to="{name : 'HP_Page'}">
                <svg class="inline" width="40px" height="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 290.658 290.658" xml:space="preserve"><g><g><rect y="139.474" style="fill:#030303;" width="290.658" height="11.711"/></g></g></svg>
                see more
                <svg class="inline" width="40px" height="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 290.658 290.658" xml:space="preserve"><g><g><rect y="139.474" style="fill:#030303;" width="290.658" height="11.711"/></g></g></svg>
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