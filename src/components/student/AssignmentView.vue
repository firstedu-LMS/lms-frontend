<template>
    <div>
        <h1>{{ course_id }}</h1>
        <h1>{{ batch_id }}</h1>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
    export default {
        data () {
            return {
                course_id : this.$route.params.course_id,
                batch_id : this.$route.params.batch_id,
                assignments : {}
            }
        },
        mounted () {
            ApiService.get(`students/assignments/${this.course_id}/${this.batch_id}`).then((res) => {
                console.log(res);
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>