<template>
    <div class="p-1 py-4 my-6 shadow-md sm:p-6 sm:flex">
            <img v-if="image" class="sm:w-1/4"  :src="filePath.imagePath(image)" alt="">
            <div :class="this.$slots.action && this.$slots.body ? 'justify-between' : ''" class="flex-col px-2 sm:px-4 sm:flex sm:w-1/2">
                <h1 class="mt-2 text-xl text-black sm:mt-0">{{ name }}</h1>
                <slot name="body"></slot>
                <button v-if="this.$slots.action" class="w-full py-2 mt-4 text-center text-white border sm:w-3/4 hover:bg-transparent bg-green hover:text-green border-green">
                    <slot name="action"></slot>
                </button>
            </div>
    </div>
</template>

<script>
import filePath from '@/services/public/filePath';
    export default {
        props : {
            name : {
                required : true
            },
            image : {
                required : true
            }
        },
        data() {
            return {
                filePath : filePath
            }
        }
    }
</script>

<style scoped>

</style>