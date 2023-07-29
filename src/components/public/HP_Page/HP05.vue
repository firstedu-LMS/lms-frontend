<template>
    <div>
        <div class="sm:w-[90%] mx-auto">
            <h1 class="text-2xl text-center text-blue">GET IN TOUCH WITH FIRST ICT</h1>
            <iframe class="w-full mx-auto my-10 shadow-lg rounded-xl" height="450" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d122185.32665740431!2d96.08387641296385!3d16.861470761092722!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1bfbc10914e49%3A0x507fdb33121db54!2sFirst%20Education%20Center!5e0!3m2!1sen!2smm!4v1690612764452!5m2!1sen!2smm"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="justify-around sm:flex-wrap sm:flex">
                <div class="relative p-3 m-6 sm:w-1/4">
                    <h1 class="text-xl text-center text-blue">Phone Number</h1>
                    <p @click="copyText" class="my-2 text-center cursor-pointer text-blue-2">09123456789</p>
                    <span class="absolute text-sm ml-2 top-10 right-4 text-white px-2 py-0.5 bg-blue rounded-sm" v-if="copiedText == '09123456789'">copied</span>
                    <p class="text-center">Response time approx 5 - 15 minutes , everyday from 9:00 a.m. to 5:00 p.m.</p>
                </div>
                <div class="relative p-3 m-6 sm:w-1/4">
                    <h1 class="text-xl text-center text-blue">Email Address</h1>
                    <p @click="copyText" class="my-2 text-center cursor-pointer text-blue-2">firstedu@gmail.com</p>
                    <span class="absolute text-sm ml-2 top-10 right-0 text-white px-2 py-0.5 bg-blue rounded-sm" v-if="copiedText == 'firstedu@gmail.com'">copied</span>
                    <p class="text-center">Response time approx 15 - 45 minutes , everyday from 9:00 a.m. to 5:00 p.m.</p>
                </div>
                <div class="p-3 m-6 sm:w-1/4">
                    <h1 class="text-xl text-center text-blue">Facebook Page</h1>
                    <a href="https://www.facebook.com/firstedu2021" target="_blank" class="block my-2 text-center cursor-pointer hover:underline text-blue-2">First Education Center</a>
                    <p class="text-center">Response time approx 5 - 20 minutes , everyday from 9:00 a.m. to 5:00 p.m.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                copiedText : ''
            }
        },
        methods : {
            copyText(e){
                let text = e.target.innerHTML
                navigator.clipboard.writeText(text)
                this.copiedText = text;
                setTimeout(() => {
                    this.copiedText = '';
                },1500)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>