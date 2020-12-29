
const parser = (str) => {
    const obj = {}
    str.replace(/([^&=]+)=([^&=]+)/g, function(){
        obj[arguments[1]] = arguments[2]
    })
    return obj
}

const stringify = (obj) => {
    let arr = []
    for(let k in obj){
        arr.push(`${k}=${obj[k]}`)
    }
    return arr.join('&')
}

// 1  测试代码会污染你的正常编写代码
// 2  如果删除了测试就没有保留下来，下次想看是否能通过 还需要重写
// 3  代码要是模块化的，jest

export {
    parser,
    stringify
}


console.log(parser('name=jack&age=10'))   // {name:'jack', age:10}
console.log(stringify({name:'jack', age:10}))   // 'name=jack&age=10'