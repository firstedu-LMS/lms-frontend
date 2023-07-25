<template>
    <div>
        <HPNavbar />
        <HJD01 :id="id" />
    </div>
</template>

<script>
import HPNavbar from '@/components/layouts/public/HPNavbar.vue';
import HJD01 from '../../components/public/HJD_Page/HJD01.vue';

    export default {
        components : {
            HPNavbar,HJD01
        },
        data () {
            return {
                id : this.$route.params.id
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>