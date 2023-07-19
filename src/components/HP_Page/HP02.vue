<template>
    <div class="shape">
        <div class="w-[80%] sm:py-24 text-white mx-auto">
            <h1 class="sm:text-6xl text-3xl font-black sm:leading-[3.5rem] text-center sm:text-left">Learn from the best.<br>Learn on your scedule</h1>
            <p class="my-8 text-lg font-semibold text-center sm:text-left">Discover thousands of courses from top university around the world.<br>Anywhere,anytime,enjoy risk-free with our 30-days,money back guarantee.</p>
            <div>
                <router-link to="/" class="px-4 py-2 mr-3 rounded-sm bg-cyan hover:bg-cyan-2">SIGN UP</router-link>
                <router-link to="/" class="px-4 py-2 rounded-sm">COURSES</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
@media (min-width: 640px) {
    .shape {
    background-image: url('../../../public/images/HP02/shape.png');
    background-repeat: no-repeat;
    background-size: contain;
}
}
</style>