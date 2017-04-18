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
        expect(vm.pageNumber).to.equal(50)
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
        
        // pages => Math.min(totalPage, total / count)
        expect(vm.totalPage).to.equal(20)
        expect(vm.pages).to.deep.equal([11,12,13,14,15,16,17,18,19,20])
        
        // test pages end 30 > 1000 / 50 
        vm.activePage = 30
        expect(vm.pages).to.deep.equal([11,12,13,14,15,16,17,18,19,20]) 
        
        // test pages inner
        vm.activePage = 8
        expect(vm.pages).to.deep.equal([1,2,3,4,5,6,7,8,9,10]) 
        
               
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
        
        // 300 > 20 
        vm.selectCurrentPage(300)
        expect(vm.activePage).to.equal(20)
        
        vm.selectCurrentPage(18)
        expect(vm.activePage).to.equal(18)
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
