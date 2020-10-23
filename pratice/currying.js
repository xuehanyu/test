
// 函数柯里化 Curring 是把接受多个参数的函数变成接受一个单一参数的函数， 并且返回接受余下的参数且返回结果的新函数的技术



// console.log(add(1, 2, 3))

// // 例如以上函数可以实现 add(1)(2)(3)

// function curAdd(x) {
//     return function (y) {
//         return function (z) {
//             return x + y + z
//         }
//     }
// }

// console.log(curAdd(1)(2)(3))   // 但是以上并不实现add(1,2)(3)
// function add(x, y, z) {
//     return x + y + z
// }
// function currying(fn, ...args) {
//     if (fn.length <= args.length) {
//        return fn(...args)
//     }
//     return function(...args2){
//         return currying(fn, ...args, ...args2)
//     }
// }

// let addCur = currying(add,1)
// console.log(addCur(2)(3),'0')
// console.log(addCur(1,2,3,4,))


var add = function(){
    var _args =[] 
    return function() {
        if(arguments.length === 0) {
            return _args.reduce(function(a, b) {
                return a + b;
            })
        }
        [].push.apply(_args, arguments);
        return arguments.callee;
    }
}
var sum = add()
console.log(sum(100,200)(300))
console.log(sum())