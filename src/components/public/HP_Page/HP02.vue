<template>
    <div class="shape">
        <div class="w-[80%] sm:py-24 text-white mx-auto">
            <h1 class="sm:text-6xl text-3xl font-black sm:leading-[3.5rem] text-center sm:text-left">Learn from the best.<br>Learn on your schedule</h1>
            <p class="my-8 text-lg font-semibold text-center sm:text-left">Discover thousands of courses from top university around the world.<br>Anywhere,anytime,enjoy risk-free with our 30-days,money back guarantee.</p>
            <div class="flex justify-center sm:block">
                <router-link v-if="!logged_in" :to="{name : 'RegisterPage'}" class="px-4 py-2 mr-3 rounded-sm bg-cyan hover:bg-cyan-2">SIGN UP</router-link>
                <router-link :class="logged_in ? 'bg-cyan hover:bg-cyan-2' : ''" to="/courses" class="px-4 py-2 rounded-sm hover:underline">COURSES</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logged_in : false
            }
        },
        mounted () {
            if (localStorage.getItem('id_token')) {
                this.logged_in = true;
            }
        }
    }
</script>

<style  scoped>
@media (min-width: 750px) {
    .shape {
    background-image: url('@/assets/images/HP02/shape.png');
    background-repeat: no-repeat;
    background-size: contain;
}
}
</style>