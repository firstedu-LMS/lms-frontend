<template>
    <div>
        <!-- NAV BAR -->
        <HP01 />

        <!-- HERO SECTION -->
        <div style="background-image: url('./images/HP03/song.jpg');background-repeat: no-repeat; background-size: cover;background-position: center;">
            <div class="sm:w-[80%]  mx-auto px-2 sm:px-0 py-10">
                <HPNavbar />
                <HP02 class="my-12" />
            </div>
        </div>

        <!-- ADVERTISE SECTION -->
        <div class="px-2 sm:px-8">
            <HP03 class="my-12" />
        </div>

        <!-- COURSES SECTION -->
        <div class="px-2 sm:px-8">
            <HP04 class="my-12" />
        </div>

        <!-- Contact Section -->
        <div class="px-2 sm:px-8">
            <HP05 class="my-12" />
        </div>
    </div>
</template>

<script>
import HP01 from '@/components/public/HP_Page/HP01.vue';
import HPNavbar from '@/components/layouts/public/HPNavbar.vue';
import HP02 from '@/components/public/HP_Page/HP02.vue';
import HP03 from '@/components/public/HP_Page/HP03.vue';
import HP04 from '@/components/public/HP_Page/HP04.vue';
import HP05 from '@/components/public/HP_Page/HP05.vue';
    export default {
        components : {
            HP01,HPNavbar,HP02,HP03,HP04,HP05
        },
        data () {
            return {
                bg_photo : './images/HP03/song.jpg'
            }
        }
    }
</script>

<style  scoped>

</style>