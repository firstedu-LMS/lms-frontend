<template>
    <div>
        <div class="flex">
            <router-link to="/">
                <span style="font-size: 30px ; font-weight: 300; margin-top : 15px; margin-left: 20px;" class="material-icons-sharp">arrow_back</span>
            </router-link>
            <h1 class="text-xl font-bold my-4 mx-4 border-b">Assignments</h1>
        </div>
        <div class="flex justify-between mx-16 my-3 py-1.5 border-b border-b-blue-2">
            <h1>Title 1</h1>
            <div class="flex">
                <button class="py-1 px-4 bg-blue-2 rounded-xl mr-4 text-white">30th November 2023/6pm</button>
                <span  class="material-icons-sharp py-1 px-1 rounded-full bg-blue-2">event_available</span>
            </div>            
        </div>
    </div>
</template>
<script>
    export default {
        
    }
</script>

<style scoped>

</style>