<template>
    <div class="sm:flex p-4">

        <div class="sm:w-2/3 sm:mx-8">
            <h1 class="text-3xl my-6 font-bold text-black">{{ career.name }}</h1>
            <div class="my-6">
                <h1 class="text-2xl my-2">Job Description</h1>
                <p class="ml-4" v-html="career.job_description"></p>
            </div>
            <div class="my-6">
                <h1 class="text-2xl my-2">Job Requirement</h1>
                <p class="ml-4" v-html="career.job_requirement"></p>
            </div>
        </div>

        <div class="sm:w-1/3">
                <ul class="text-center">
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
                    <li class="bg-blue text-white">
                        <button>Apply Now</button>
                    </li>
                </ul>
        </div>

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
                career : {}
            }
        },
        mounted(){
            axios.get(`careers/${this.id}`).then(res => {
                this.career = res.data.data
                console.log(this.career);
            }).catch(res => {
                console.log(res);
            })

            const styleElement = document.createElement('style');
            styleElement.innerHTML = `p ol {list-style: disc;}`;
            document.head.appendChild(styleElement);
        }

    }
</script>

<style scoped>
 li{
        padding: 0.5rem 2rem;
        text-align: center;
        border: 1px solid gray;
    }
</style>