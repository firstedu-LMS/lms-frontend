<template>
    <div class="p-4">
        <h1 class="p-4">NEW</h1>
        <form class="h-fit justify-between flex-wrap w-full flex">
            <div class="w-[32%] inline p-4">
                <label>Name</label>
                <input type="text" class="outline-none  border-b w-[70%] ">
            </div>
            <div class="w-[32%] inline p-4">
                <label >Vacancy</label>
                <input type="number" class="outline-none border-b w-[70%] ">
            </div>
            <div class="w-[32%] inline p-4">
                <label  >Age</label>
                <input type="number" class="outline-none border-b w-[70%]">
            </div>
            <div class="w-[32%] inline p-4">
                <label>Position</label>
                <input type="text" class="outline-none border-b w-[70%] ">
            </div>
            <div class="w-[32%] inline p-4">
                <label>Employment Status</label>
                <select class="outline-none border-b bg-transparent w-[70%]">
                    <option>
                    </option>
                </select>
            </div>
            <div class="w-[32%] inline p-4">
                <label >Salary</label>
                <input type="number" class="outline-none border-b w-[70%] ">
            </div>
            <div class="w-[32%] inline p-4">
                <label >Salary Period</label>
                <select class="outline-none border-b bg-transparent w-[70%]">
                    <option ></option>
                </select>
            </div>
            <div class="w-[32%] inline p-4">
                <label >Deadline</label>
                <input type="date" class="outline-none border-b  w-[70%] ">
            </div>
            <div class="w-full">
                <label class="block mb-2 text-sm font-medium ">Job Description</label>
                <textarea class="w-full block " rows="4"></textarea>
            </div>
            <div class="w-full">
                <label class="block mb-2 text-sm font-medium ">Job Requirement</label>
                <textarea class="w-full block " rows="4"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>