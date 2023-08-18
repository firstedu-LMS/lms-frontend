<template>
    <div>
        {{ lessonStore.course }}
        <br> <hr>
        {{ lessonStore.batch }}
        <br> <hr>
        {{ lessonStore.week }}
        <br> <hr>

    </div>
</template>

<script>
import { useLessonStore } from '@/stores/lesson'
    export default {
        data() {
           return {
            lessonStore : useLessonStore()
           } 
        },

    }
</script>

<style lang="scss" scoped>

</style>