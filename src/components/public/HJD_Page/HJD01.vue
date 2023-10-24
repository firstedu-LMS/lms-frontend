<template>
    <div class="mt-6 sm:flex">
        <div class="sm:w-[75%]">
            <h1 class="mb-6 text-3xl font-bold text-black">{{ career.name }}</h1>
            <div class="my-6">
                <h1 class="my-2 text-2xl">Job Description</h1>
                <p class="ml-4" v-html="career.job_description"></p>
            </div>
            <div class="my-6">
                <h1 class="my-2 text-2xl">Job Requirement</h1>
                <p class="ml-4" v-html="career.job_requirement"></p>
            </div>
        </div>
        <ul class="sm:ml-10 text-center sm:w-[25%] sm:mt-0">
            <li class="text-white bg-green">Summary</li>
            <li>Vacnacy - {{ career.vacancy }} posts</li>
            <li>Position - {{ career.position }}</li>
            <li>Employment Status - {{ career.employment_status }}</li>
            <li>Age - {{ career.age }}</li>
            <li>Gender - Any</li>
            <li>Salary - {{ career.salary }}</li>
            <li>Salary Period - {{ career.salary_period }}</li>
            <li>Publish on - {{ career.created_at }}</li>
            <li>Deadline - {{ career.deadline }}</li>
            <li class="text-white bg-blue">
                <button  @click="showForm" class="w-full">Apply Now</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props : {
            id: {
                type: String,
                required: true
            },
        },
        data(){
            return{
                career : {},
                loading : false
            }
        },
        mounted(){
            axios.get(`careers/${this.id}`).then(res => {
                this.career = res.data.data;
                res.data.data.deadline= new Date(res.data.data.deadline).toDateString();
                res.data.data.created_at = new Date(res.data.data.created_at).toDateString();
                this.$emit('name' , this.career.name);
            }).catch(res => {
                console.log(res);
            })

            const styleElement = document.createElement('style');
            styleElement.innerHTML = `p ol , p ul {list-style: disc;}`;
            document.head.appendChild(styleElement);
        },

        methods : {
            showForm() {
                this.$emit('showForm')
            }
        }

    }
</script>

<style scoped>
 li{
        padding: 0.5rem 2rem;
        text-align: center;
        border: 1px solid rgb(187, 187, 187);
    }
</style>