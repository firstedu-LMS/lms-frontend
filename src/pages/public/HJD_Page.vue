<template>
    <div>
        <HPNavbar class="z-10" />
        <HJD01  :class="{ 'page-blur': formActive }" @showForm="toggleForm" class="z-10" :id="id" />
        <HJD02 @hideForm="toggleForm" v-if="formActive" class="z-50 fixed m-2 sm:translate-x-[-50%] translate-y-[-50%] sm:w-[30%] top-1/2 sm:left-1/2" />
    </div>
</template>

<script>
import HPNavbar from '@/components/layouts/public/HPNavbar.vue';
import HJD01 from '../../components/public/HJD_Page/HJD01.vue';
import HJD02 from '@/components/public/HJD_Page/HJD02.vue';

    export default {
        components : {
            HPNavbar,HJD01,HJD02
        },
        data () {
            return {
                id : this.$route.params.id,
                formActive : false,
            }
        },
        methods : {
            toggleForm(){
                this.formActive = !this.formActive
            }
        }
    }
</script>

<style scoped>
.page-blur {
  filter: blur(2px);
}
</style>