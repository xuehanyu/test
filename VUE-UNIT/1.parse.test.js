import {parser,stringify} from './src/1.parse.js'

// 断言
// 分类， 就是用例的一个作用域，可以放多个测试用例，用来分类
describe('分类1',()=>{
    it('1.我希望测试当前parse方法是否ok',()=>{
        expect(parser('name=jack&age=10')).toEqual({name:'jack',age:'10'})
    })
})


describe('分类二',()=>{
    it('1.我希望测试当前stringify方法是否ok',()=>{
        expect(stringify({name:'jack',age:'10'})).toEqual('name=jack&age=10')
    })
})
