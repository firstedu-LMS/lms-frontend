import { defineStore } from "pinia";

export const useLessonStore = defineStore('lesson' , {
    state : () => {
        return {
            course : {},
            batch : {},
            week : {}
        }
    },
    actions : {
        setCourse (course){
            this.course = course;
        },
        setBatch (batch){
            this.batch = batch;
        },
        setWeek (week){
            this.week = week;
        },
    }
})