<template>
    <div>    
        <form class="w-[60%] absolute top-10 mx-32 ">
            <div class="bg-gray-3 px-8 my-4 py-6">
                <div class="w-full px-8">
                    <label class="w-2/6" for="name">Name</label>
                    <input class="w-4/6 ml-36 my-3 py-1.5 px-2 outline-none" name="name" type="text" placeholder="Name">
                </div>
                <div class="w-full px-8">
                    <label class="w-2/6 mx-0.5" for="email">Email</label>
                    <input class="w-4/6 ml-36 my-3 py-1.5 px-2 outline-none" name="email" type="email" placeholder="Email">
                </div>
                <div class="w-full px-8">
                    <label class="w-2/6" for="phone">Phone</label>
                    <input class="w-4/6 ml-36  my-3 py-1.5 px-2 outline-none" name="phone" type="text" placeholder="Phone">
                </div>
                <div class="w-full px-8">
                    <label class="w-2/6" for="date_of_birth">Date Of Birth</label>
                    <input class="w-4/6 ml-24 my-3 py-1.5 px-2 outline-none" name="date_of_birth" type="date" placeholder="date_of_birth">
                </div>
                <div class="w-full flex my-6 ">
                    <label class="w-1/6  my-8 ml-9" for="address">Address</label>
                    <textarea name="" class="my-4 mx-16 px-3 outline-none" id="" cols="43" rows="4"></textarea>
                </div>
            </div>
            <div class="flex justify-between">
                <div class="bg-gray-3 py-1 text-center w-4/6">
                    <p>Computer Basic</p>
                </div>
                <div class="w-[25%]">
                    <select class="w-full bg-gray-3 py-2 px-2 outline-none">
                        <option selected disabled value="">Choose Batch</option>
                        <option value="">Batch 1</option>
                        <option value="">Batch 2</option>
                        <option value="">Batch 3</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-end my-4">
                <button class="bg-green text-white py-1.5 px-8 rounded-md">Accept</button>
            </div>
        </form>
       
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>