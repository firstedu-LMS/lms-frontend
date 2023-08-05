<template>
<div class="flex justify-between p-2">
        <p class="p-2">{{ paginationData.per_page }} per page</p>
        <div class="flex px-2 py-2">
            <button  :class="paginationData.current_page == 1 ? 'blur-[1px]' : ''"  @click="paginatePrevious" class="flex items-center px-4 mx-2">
                <span class="material-icons-outlined"  style="font-size: 0.9rem;margin-right: 5px;">arrow_back_ios</span>previous
            </button>
            <div>
                <span v-for="n in  this.paginationData.paginate_pages" :key="n">
                    <span v-if="n > 0 && n <= paginationData.last_page" @click="paginateRandom(n)"  :class="n ==paginationData.current_page ? 'bg-blue-2 text-white' : ''" class="p-2 py-1 mx-2 rounded-full cursor-pointer">
                        {{ n }}
                    </span>
                </span>
            </div>
            <!-- <span class="font-bold">{{ paginationData.current_page }}&nbsp;&nbsp;of&nbsp;&nbsp;{{ paginationData.last_page }}</span> -->
            <button :class="paginationData.last_page <= paginationData.current_page ? 'blur-[1px]' : ''" @click="paginateNext" class="flex items-center px-4 mx-2">
                next<span class="material-icons-outlined" style="font-size: 0.9rem;margin-left: 5px;">arrow_forward_ios</span>
            </button>
        </div>
    </div>
</template>

<script>

    export default {
        props : {
            paginationProp : {
                type : Object
            }
        },

        data(){
            return {
                paginationData : {}
            }
        },

        watch : {
            'paginationData.current_page'() {
                this.generatePaginatePages();
            }
        },

        methods : {
            generatePaginatePages (){
                this.paginationData.paginate_pages = [];
                for (let i = this.paginationData.current_page - 2; i < this.paginationData.current_page + 3; i++) {
                    this.paginationData.paginate_pages.push(i);
                }
            },
            paginateNext(){
                if (this.paginationData.current_page < this.paginationData.last_page) {
                    this.paginationData.current_page++;
                    this.$emit('next' , this.paginationData.current_page)
                }
            },
            paginatePrevious(){
                if(this.paginationData.current_page > 0){
                    this.paginationData.current_page--;
                    this.$emit('previous' , this.paginationData.current_page)
                }
            },
            paginateRandom(n){
                this.paginationData.current_page = n;
                this.$emit('random' , this.paginationData.current_page)
            },
        },

        mounted () {
            this.paginationData = this.paginationProp
            this.paginationData.paginate_pages = [];
        }
    }
</script>

<style lang="scss" scoped>

</style>