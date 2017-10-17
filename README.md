# vue pagination

基于 vue 2 封装出的 分页 组件，提供了基本的样式和事件。

## Install

```bash
npm i vt-button -S

import Pagination from 'vt-pagination'

// global install
Vue.component('Pagination', Pagination)

// scope install
export default {
    components: {
        Pagination
    }
}
``` 

## Usage

```example
<template>
   <Pagination total=1000 count=20 pageCount=5 currentPage=1></Pagination> 
</template>

<script>
    import Pagination from 'vt-pagination'

    export default {
        methods: {
            
        },
        components: {
            Pagination
        }
    }
</script>
```

## Interface

```interface
props:
  total:
    type: Number
    default: 1
    description: 总页码数
  count:
    type: Number
    default: 50
    description: 每页条数
  pageCount:
    type: Number
    default: 10
    description: 页码显示展示个数
  currentPage:
    type: Number
    default: 1
    description: 当前页码
  countOptions: 
    type: Array
    default: 10, 20, 50, 100
    description: 每页条数配置参数
events:
  current-change:
    description: 点击当前页码，第一个参数： 当前页码，第二个参数： 上一个页码
  count-change: 
    description: 切换每页显示条数触发事件，参数：当前切换的条数
```
