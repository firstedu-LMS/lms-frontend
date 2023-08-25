<template>
    <div>
        <div class="w-3/4 mx-auto pb-10" >
            <video v-if="lesson.video" controls>
                <source :src="filePath.videoPath(lesson.video.video)" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <h1 class="my-4 text-lg">{{ lesson.name }}</h1>
            <p v-html="lesson.description"></p>
            <CreateQuestions/>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService';
import filePath from '../../../services/public/filePath';
import CreateQuestions from './CreateQuestions.vue';
    export default {
        components: {
            CreateQuestions
        },
        props : {
            id : {
                required  : true
            }
        },
        data() {
            return {
                lesson : {},
                filePath : filePath
            }
        },
        mounted () {
            ApiService.get(`admin/lessons/${this.id}`).then((res) => {
                this.lesson = res.data.data;
                console.log(this.lesson);
                this.$emit('setLesson' , this.lesson.name)
            }).catch((res) => {
                console.log(res);
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>