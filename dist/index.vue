<style src="./style.css"></style>
<template src="./template.html"></template>
<script>
    import Buttons from 'vt-button'
    export default {
        components: {
            Buttons
        },
        props: {
            total: { // 总页数
                type: Number,
                required: true
            },
            count: { // 每页条数
                type: Number,
                default: 50
            },
            pageCount: { // 页码显示展示个数
                type: Number,
                default: 10
            },
            currentPage: { // 当前页面
                type: Number,
                default: 1
            },
            countOptions: { // 每页条数配置
                type: Array,
                default: function(){
                    return [10, 20, 50, 100]
                }
            }
        },
        data(){
            return {
                activePage: this.currentPage,
                pageNumber: this.count,
                jumpNumber: this.currentPage
            }
        },
        computed: {
            // 总共多少页
            totalPage(){
                return Math.ceil(this.total / this.pageNumber)
            },
            // 展示的页码
            pages(){
                let start, i, pages, pageCount, activePage
                i = 0
                pages = []
                pageCount = Math.min(this.pageCount, this.totalPage)
                activePage = Math.min(this.activePage, this.totalPage)
                
                if(activePage % pageCount) {
                    start = Math.floor(activePage / pageCount) * pageCount + 1
                } else {
                    start = activePage - pageCount + 1
                }
                
                while(i < pageCount && start + i <= this.totalPage) {
                    pages[i] = start + i
                    i++
                }
                return pages
            }
        },
        methods: {
            selectCurrentPage(page){
                if(page > this.totalPage) {
                    page = this.totalPage
                } else if(page < 1){
                    page = 1
                }
                this.$emit('current-change', page, this.activePage)
                this._syncPage(page)
            },
            selectNextPage(){
                this.selectCurrentPage(this.activePage + 1)
            },
            selectPrePage(){
                this.selectCurrentPage(this.activePage - 1)
            },
            countChange(){
                this._syncPage(1)
                this.$emit('count-change', this.pageNumber)
            },
            jump(){
                /* istanbul ignore next */
                this.selectCurrentPage(this.jumpNumber)
            },
            _syncPage(page){
                 /* istanbul ignore next */
                this.activePage = page
                this.jumpNumber = page
            }
        }
    }
</script>
