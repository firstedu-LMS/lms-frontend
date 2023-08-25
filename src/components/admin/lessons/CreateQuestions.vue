<template>
    <div class="relative">
        <button :class="addQues ? addQues == true : quesForm == false" @click="showForm" class="bg-blue-2 px-3 py-1 mt-2 rounded text-white">Add Ques +</button>
        <form v-if="quesForm" class="py-2" action="">
            <div class="relative flex flex-wrap">
                <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                    Question
                </span>
                <input type="text" class="w-[84%] block rounded-r border border-gray-2 bg-transparent"/>
            </div>
            <div class="relative flex flex-wrap">
                <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                    Option-1
                </span>
                <input type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
            </div>
            <div class="relative flex flex-wrap">
                <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                    Option-2
                </span>
                <input type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
            </div>
            <div class="relative flex flex-wrap">
                <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                    Option-3
                </span>
                <input type="text" class="w-[85%] block rounded-r border border-gray-2 bg-transparent"/>
            </div>
            <div class="relative flex flex-wrap">
                <span class="flex px-3 py-1 items-center rounded-l border border-r-0 border-solid">
                    Answer
                </span>
                <input type="text" class="w-[86%] block rounded-r border border-gray-2 bg-transparent"/>
            </div>
            <div class="w-[95%] flex justify-end">
                <button class="bg-red px-3 py-1 rounded my-1 text-white">Remove -</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addQues : true,
                quesForm : false, 
            }
        },
        methods : {
            showForm(){
                this.addQues = this.quesForm = true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>