<template>
    <div class="sm:flex">
        
        <div class="sm:w-1/2">
            <h3 class="font-semibold text-cyan">Learn how you want where you want</h3>
            <h1 class="py-4 text-4xl font-semibold text-black">The world's largest selection of online courses</h1>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos voluptatum fuga vero et perspiciatis atque enim inventore consectetur sint culpa. Deserunt, molestias fugit laboriosam fugiat sequi magnam animi quod doloribus! Deserunt, molestias fugit laboriosam fugiat sequi magnam animi quod doloribus!
            </p>
            <ul class="flex-wrap text-lg sm:flex">
                <li class="sm:w-1/2" v-for="program in programs" :key="program.name">
                    <div class="flex p-4">
                        <img :src="program.image" class="w-20" alt="">
                        <p class="my-auto ml-4">{{ program.name }}</p>
                    </div>
                </li>
            </ul>
        </div>

        <img class="mt-4 rounded-sm sm:w-1/2 sm:mt-0" :src="ad_image" alt="">

    </div>
</template>

<script>
    export default {
        data () {
            return {
                ad_image : './images/HP03/song.jpg',
                programs : [
                {
                    name : 'Offline Classes',
                    path : 'HP_Page',
                    image : './images/HP03/people.png'
                },
                {
                    name : 'Online Classes',
                    path : 'HP_Page',
                    image : './images/HP03/laptop.png'
                },
                {
                    name : 'Job Offers',
                    path : 'HP_Page',
                    image : './images/HP03/briefcase.png'
                },
                {
                    name : 'Internship Programs',
                    path : 'HP_Page',
                    image : './images/HP03/monitor.png'
                },
            ]
            }
        }
    }
</script>

<style scoped>

</style>