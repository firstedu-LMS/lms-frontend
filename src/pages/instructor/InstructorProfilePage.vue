<template>
    <div>
        <div class="z-10 flex flex-wrap items-center justify-center py-12">
            <div class="flex justify-center w-full sm:w-[45%]">
                <img src="https://media.allure.com/photos/62fe7816f971d65fad627438/3:2/w_2829,h_1886,c_limit/emma%20watson%20pixie.jpg" class="cursor-pointer w-[240px] h-[240px] rounded-full border-[0.4rem] border-blue-3" alt="">
            </div>
            <div class="w-full sm:w-[45%] sm:p-0 p-2 sm:text-xl font-semibold relative">
                <span title="Edit Name" style="cursor:pointer;margin-left:2rem; background-color:rgb(243, 243, 239); padding:0.5rem;border-radius:50%;font-size:20px;position: absolute;top: 0;right: 0px;" class="material-icons">edit</span>
                <h3 class="my-6">
                    <span class="inline-block sm:w-[30%]">Instructor Name </span>
                    &raquo; &nbsp;
                    [ <input class="text-center outline-none text-blue-3" v-model="profile.name" :style="{width : `${profile.name.length + 2}ch`}" /> ]
                </h3>
                <h3 class="my-6">
                    <span class="inline-block sm:w-[30%]">Instructor ID </span>
                    &raquo;&nbsp;&nbsp;
                    [ <span class="text-blue-3">I-1001</span> ]</h3>
                <h3 class="my-6">
                    <span class="inline-block sm:w-[30%]">Joined At </span>
                    &raquo;&nbsp;&nbsp;
                     [ <span class="text-blue-3">22.11.2023</span> ]</h3>
            </div>
        </div>
        
        <div class="w-full sm:flex justify-evenly bg-[#f2efef]">
            <div class="w-full sm:w-[45%] px-2 pt-4 pb-8">
                <h1 class="text-xl font-semibold text-blue-3">PERSONAL INFORMATIONS</h1>
                <button @click="editing = true" v-if="!editing" class="float-right text-blue-3">edit</button>
                <form class="text-sm">
                    <button v-if="editing" class="float-right ml-4 text-base text-blue-3">save</button>
                    <span v-if="editing" @click="editing = false" class="float-right text-base cursor-pointer text-blue-3">cancel</span>
                    <div :class="classes.inputGroups">
                        <label :class="classes.labels" for="email">Email</label>
                        <p :class="classes.inputs">{{ profile.email }}</p>
                    </div>
                    <div :class="classes.inputGroups">
                        <label :class="classes.labels" for="email">Phone Number</label>
                        <input :style="{borderBottom : editing ? '1px blue solid' : ''}" :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.phone">
                    </div>
                    <div :class="classes.inputGroups">
                        <label :class="classes.labels" for="email">Address</label>
                        <textarea :style="{borderBottom : editing ? '1px blue solid' : ''}" rows="2" :class="classes.inputs" type="text" :disabled="!editing" v-model="profile.address">
                        </textarea>
                    </div>
                    <div :class="classes.inputGroups">
                        <label :class="classes.labels" for="email">Curriculum Vitae</label>
                        <p :class="classes.inputs">1</p>
                    </div>
                </form>
            </div>
            <div class="w-full sm:w-[45%] px-2 pt-4 pb-8">
                <h1 class="text-xl font-semibold text-blue-3">ACTIVITIES</h1>
                <button class="float-right text-[#f2efef]">.</button>
                <div class="text-sm">
                    <div :class="classes.inputGroups">
                        <p :class="classes.labels">Current courses</p>
                        <p :class="classes.inputs" class="text-center">3</p>
                    </div>
                    <div :class="classes.inputGroups">
                        <p :class="classes.labels">Finished Courses</p>
                        <p :class="classes.inputs" class="text-center">1</p>
                    </div>
                    <div :class="classes.inputGroups">
                        <p :class="classes.labels">&nbsp;</p>
                        <p :class="classes.inputs" class="text-center">&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                profile : {
                    name : 'Emma Watson',
                    email : 'emma@gmail.com',
                    phone : '123456789',
                    address : 'insein, yangon, Myanmar',
                },
                editing : false,
                classes : {
                    inputGroups : 'border bg-white flex w-full border-[#f2efef] p-2',
                    labels : 'w-[40%] p-2 border-r block border-[#f2efef] text-sm',
                    inputs : 'w-[60%] p-2 bg-transparent outline-none'
                },
            }
        }
    }
</script>

<style scoped>

</style>