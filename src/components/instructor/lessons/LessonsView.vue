<template>
    <div>
        <div v-for="lesson in lessons" :key="lesson.id" class="p-2 sm:px-24 sm:p-0">
            <router-link to="/" class="flex justify-between w-full border-b sm:my-6 hover:text-blue-2">
                <p>{{ lesson.name }}</p>
                <p>{{ lesson.created_at }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
    export default {
        data() {
           return {
            parameters : this.$route.params,
            lessons : [],
           } 
        },
        methods : {
            getLessons () {
                ApiService.get(`instructors/lessons/${this.parameters.week_id}`).then((res) => {
                    this.lessons = res.data.data;
                    console.log(res);
                }).catch((res) => {
                    console.log(res);
                })
            },
            showDetails(id) {
                this.$emit('showDetails' , id)
            },
            deleteLesson(id) {
                ApiService.delete(`admin/lessons/${id}`).then(() => {
                    window.location.reload()
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        mounted() {
            this.getLessons();
        }

    }
</script>

<style lang="scss" scoped>

</style>