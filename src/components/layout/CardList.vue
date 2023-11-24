<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <pre>{{ item.name }}</pre>
        </div>
    </div>
</template>

<script>
// import CourseCard from './CourseCard.vue';
    export default {
        props : {
            items : {
                required : true
            }
        },
        components : {
            // CourseCard
        }
    }
</script>

<style scoped>

</style>