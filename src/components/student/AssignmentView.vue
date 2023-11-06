<template>
    <div>
        {{ batch_id }}
        {{ course_id }}
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';

    export default {
        data () {
            return {
                batch_id : this.$route.params.batch_id,
                course_id : this.$route.params.course_id,
                assignments : {}
            }
        },
        mounted () {
            ApiService.get(`student/assignments/${this.course_id}/${this.batch_id}`).then((res) => {
                console.log(res.data);
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>