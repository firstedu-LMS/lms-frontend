<template>
    <div>
        <h1>{{ course_id }}</h1>
        <h1>{{ batch_id }}</h1>
    </div>
</template>

<script>
    export default {
        props : ["course_id" , "batch_id"]
    }
</script>

<style scoped>

</style>