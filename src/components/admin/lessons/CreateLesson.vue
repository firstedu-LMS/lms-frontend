<template>
    <div class="p-4">
        <h1 class="px-4 font-black">NEW</h1>
        <form class="flex flex-wrap" @submit.prevent="CreateLesson" >
                <div class="w-full my-8">
                    <label class="text-[12px] font-semibold" for="name">Name</label>
                    <input v-model="lesson.name" type="text" class="px-2 w-[30%] mx-5 py-1 border-b outline-none">
                </div>
            <div class="w-full mt-8 mb-32">
                <label class="font-semibold text-[12px]" for="description">Description</label>
                <quill-editor class="shadow-md shadow-black w-[90%]" v-model:content="lesson.description" theme="snow" toolbar="full" contentType="html"></quill-editor>
            </div>
            <div class="w-[30%] my-8">
                <label for="image">Image</label>
                <input @change="saveImage" type="file" class="w-full px-4 py-1 border-b outline-none file:border-0 file:text-sm">
            </div>

            <div class="flex  w-full my-2">
                <button class="px-3 py-1 text-black bg-white shadow-sm">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
    export default {
        components : {
            QuillEditor
        } ,
        data() {
            return {
                lesson : {
                    name : '',
                    description : '',
                    
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>