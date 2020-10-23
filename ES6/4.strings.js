// es6 模板字符串 特殊的字符串
//  模版字符串取代了原油的字符串拼接功能 `${变量}`


// 好处： 1、支持换行； 2、可以直接取值，不需要转义


//  如何自己实现一个类模板字符串的功能
let name = 'jack'
let age = 18
let str = 'hello!${name}今年${age}岁了'
str = str.replace(/\$\{([^}]*)\}/g, function () {
    console.log(arguments[1])
    return eval(arguments[1])
})

console.log(str)


// 带标签的模板字符， 自定义模板字符串的实现， 实现前后带*
let name = 'jack'
let age = 18
function xhy(){
    let strings = arguments[0]
    let vales = [].slice.call(arguments, 1)
    let str = ''
    for(let i=0;i<vales.length; i++){
        str += `${strings[i]}*${vales[i]}*`
    }
    str += strings[strings.length-1]
    return str
}
let str = xhy`hello~${name}今年${age}岁了`
console.log(str)


// 字符常用方法
// includes  是否包含  返回布尔值
let url = 'http://www.zhufengpeixun.cn/logo.png'
console.log(url.includes('zhufengpeixun'))
// startsWith  以xxxx 开头
console.log(url.startsWith('1ht'))
// endsWith  以xxxx 结尾
console.log(url.endsWith('.png'))

// padStart padEnd 补全
// 进制转换
setInterval(()=>{
    let date= new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let str = `${hours.toString().padStart(2,0)}:`
     str += `${minutes.toString().padStart(2,0)}:`
     str += `${seconds.toString().padStart(2,0)}`
     console.log(str)
},1000)


