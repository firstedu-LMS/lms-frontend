<template>
    <div class="absolute top-0 left-0 z-50 flex items-center w-screen h-screen bg-black bg-opacity-90">
        <dialog class="fixed z-50 flex flex-col items-center p-6 rounded-sm text-gray " style="box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;" open>
            <span style="color: #f30909; font-size: 6rem;" class="material-icons-sharp">cancel</span>
            <p class="my-6 text-xl">{{ message }}</p>
            <button class="w-full py-1.5 text-white rounded hover:bg-transparent hover:text-green border border-green bg-green" @click="reload">Okay</button>
        </dialog>
    </div>
</template>

<script>
    export default {
        props : ["message"],
        methods : {
            reload() {
                this.$emit('reload')
            }
        }
    }
</script>

<style scoped>

</style>