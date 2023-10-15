<template>
    <div>

        <div v-if="submitted" class="flex flex-wrap justify-end text-white">
            <p class="w-full p-3 text-center bg-green">You have successfully submitted your application form. We will inform you after we analysis. Thank you for applying.</p>
            <router-link class="px-4 py-1 mt-1 bg-blue" to="/">Okay</router-link>
        </div>

        <form v-else @submit.prevent="apply" class="p-6 bg-white shadow">
            <div class="flex justify-end">
                <span @click="hideForm" class="mr-2 text-xl cursor-pointer">
                    <span class="material-icons-sharp" style="font-size: 28px;">close</span>
                </span>
            </div>
            <div class="my-4">
                <label  for="email">Email</label>
                <input v-model="formData.email" class="w-full px-2 py-1 mt-1 border outline-none border-gray" type="email" required>
            </div>
            <div class="my-4">
                <label  for="email">Your Resume or Curriculum Vitae (PDF only)</label>
                <input @change="insertCV" required type="file" class="w-full mt-1 border cursor-pointer file:cursor-pointer border-gray file:bg-transparent file:border-0 file:py-1 file:px-2">
            </div>
            <div>
                <button :disabled="submitting" class="w-full py-1.5 text-center text-white bg-green text-lg">Submit</button>
            </div>
        </form>

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        props : ['name'],
        data(){
            return {
                submitted : false,
                submitting : false,
                formData :{
                    email : '',
                    cv : '',
                    career : this.name
                }
            }
        },
        methods : {
            hideForm(){
                this.$emit('hideForm')
            },
            insertCV(e){
                this.submitting = true;
                let file = e.target.files[0];
                let form = new FormData();
                form.set('cv' , file)
                axios.post('admin/cv-forms' , form).then((res) => {
                    this.formData.cv_id = res.data.data.id
                    this.submitting = false;
                }).catch((res) => {
                    alert('ERROR !')
                    console.log(res);
                })
            },
            apply(){
                this.submitting = true;
                axios.post('admin/applications' , this.formData).then(() => {
                    this.submitted = true;
                }).catch(res => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style  scoped>

</style>