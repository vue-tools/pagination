<style src="./style.css"></style>
<template src="./template.html"></template>
<script>
    import Buttons from 'vt-button/dist/index.vue'
    export default {
        components: {
            Buttons
        },
        props: {
            total: { // 总页数
                type: [Number, String],
                required: true
            },
            count: { // 每页条数
                type: [Number, String],
                default: 50
            },
            visibleCount: {
                type: [Number, String],
                default: 5
            },
            currentPage: { // 当前页面
                type: [Number, String],
                default: 1
            }
        },
        data(){
            return {
                currentPager: this.currentPage,
                gotoPage: this.currentPage,
                countOptions: [10, 20, 50, 100],
                currentCount: 10
            }
        },
        computed: {
            totalPage(){
                return Math.ceil(this.total / this.currentCount)
            },
            pages(){
                let start, i, pages, visibleCount
                i = 0
                pages = []
                visibleCount = this.visibleCount
                if(this.total < visibleCount) {
                    visibleCount = this.total
                    start = 1
                } else {
                    if(this.currentPager % visibleCount) {
                        start = Math.floor(this.currentPager / visibleCount) * visibleCount + 1
                    } else {
                        start = this.currentPager - visibleCount + 1
                    }

                }
                while(i < visibleCount) {
                    pages[i] = start + i
                    i++
                }
                return pages
            }
        },
        methods: {
            selectCurrentPage(page){
                this.$emit('current-change', page, this.currentPager)
                this.currentPager = page
            },
            selectNextPage(){
                this.$emit('current-change', this.currentPager + 1, this.currentPager)
                this.currentPager++
            },
            selectPrePage(){
                this.$emit('current-change', this.currentPager - 1, this.currentPager)
                this.currentPager--
            },
            countChange(){
                this.currentPager = 1
                this.$emit('count-change', this.currentCount)
            },
            jump(){
                if(this.gotoPage > this.totalPage) {
                    this.gotoPage = this.totalPage
                } else if(this.gotoPage < 1){
                    this.gotoPage = 1
                }
                this.$emit('current-change', this.gotoPage, this.currentPager)
                this.currentPager = this.gotoPage
            }
        }
    }
</script>
