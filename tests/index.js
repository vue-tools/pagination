import Vue from 'vue'
import Pagination from '../src'
import { expect } from 'chai'

describe('vt-pagination', () => {
    it('props', () => {  
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 2
            }
        }).$mount()
        expect(vm.total).to.equal(1000)
        expect(vm.count).to.equal(50)
        expect(vm.pageCount).to.equal(10)
        expect(vm.currentPage).to.equal(2)
    })
    it('data', () => {
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 2
            }
        }).$mount()
        expect(vm.activePage).to.equal(2)
        expect(vm.pageNumber).to.equal(10)
    })
    it('computed', () => { 
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 11
            }
        }).$mount()
        
        expect(vm.totalPage).to.equal(100)
        expect(vm.pages).to.eql([11,12,13,14,15,16,17,18,19,20])
        
        // test int pages
        vm.activePage = 30
        expect(vm.pages).to.eql([21,22,23,24,25,26,27,28,29,30])        
    })
    it('current page change', () => {
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 11
            }
        }).$mount()
        
        //  -1 < 1
        vm.selectCurrentPage(-1)
        expect(vm.activePage).to.equal(1)
        
        // 300 > 100 
        vm.selectCurrentPage(300)
        expect(vm.activePage).to.equal(100)
        
        vm.selectCurrentPage(30)
        expect(vm.activePage).to.equal(30)
    })
    it('next page', () => {
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 11
            }
        }).$mount()
        vm.selectNextPage()
        expect(vm.activePage).to.equal(12)
    })
    it('pre page', () => {   
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 11
            }
        }).$mount()
        
        vm.selectPrePage()
        expect(vm.activePage).to.equal(10)
    })
    it('count change', () => {
        let Control = Vue.extend(Pagination)
        let vm = new Control({
            propsData: {
                total: 1000,
                count: 50,
                pageCount: 10,
                currentPage: 11
            }
        }).$mount()
        
        vm.pageNumber = 100
        vm.countChange()
        expect(vm.pages).to.eql([1,2,3,4,5,6,7,8,9,10])
        expect(vm.activePage).to.eql(1)
    })
})
