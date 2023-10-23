<template>
    <div class="bg-opacity-80 bg-black w-screen h-screen absolute top-0 left-0 flex items-center">
        <dialog class="fixed z-50 flex flex-col items-center p-6 text-gray " style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
                    <span style="color: #22c55e; font-size: 6rem;" class="material-icons-sharp">check_circle</span>
                    <p class="my-6 text-xl">Course Has Been Created Successfully.</p>
                    <button class="w-full py-1.5 text-white rounded hover:bg-transparent hover:text-green border border-green bg-green" @click="reload">Okay</button>
                </dialog>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>