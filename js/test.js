// var bb = 1;
// function aa(bb) {
//     bb = 2;
//     alert(bb);
// };
// aa(bb);
// alert(bb);
// function Foo() {
//     var i = 0;
//     return function () {
//         console.log(i++);
//     }
// }

// var f1 = Foo(),
//     f2 = Foo();
// f1();
// f1();
// f2();

// var values = [1, 2, 3, 4, 5]
// var sum = values.reduce((prev, cur, index, array) => {
//     console.log(prev, cur, index)
//     return prev + cur
// })
// console.log(sum)

// function fn(num){
//     let arr = String(num).split('')
//     return arr.every(item=>{
//         String((num/item)).indexof('.') === -1
//     })
//   }
//   fn(128)
// let data = {
//     oneTimeUp : '1',
//     oneTimeDown : '1-1',
//     twoTimeUp : '2',
//     twoTimeDown : '2-2',
//     threeTimeUp : '3',
//     threeTimeDown : '3-3'
// }

// let arr = []

// function formatData(len){
//     for (let index = 0; index < len+1; index++) {
//         let obj = {}
//         let num = index === 0 ? 'one' : index === 1 ? 'two' : 'three'
//         obj.startTime = data[`${num}TimeUp`]
//         obj.endTime = data[`${num}TimeDown`]
//         arr.push(obj) 
//     }
// }


// formatData(8)
// console.log(arr)



// 1 let 配合 {}  产生会计作用域
// for(let i=0; i<5; i++){
//     setTimeout(()=>{
//         console.log(i)
//     },1000)
// }

// for(var i=0; i<5; i++){
//     (function(i){
//         setTimeout(()=>{
//             console.log(i)
//         },1000)
//     })(i)
// }

// 利用setTimeout的第三个函数
// for(var i=0; i<5; i++){
//     setTimeout((j)=>{
//         console.log(j)
//     },1000, i)
// }

// function test() {
//     var num = [] 
//     var i
//     for (i = 0; i < 10; i++) {
//         num[i] = function () {
//             console.log(i)
//         }
//     }
//     return num[5]
// }
// test()()  //  10


// var test = (function () {
//     var num = 0
//     return () => {
//         return num++
//     }
// }())
// // console.log(test)   //   test ----->  ()=>{ return num++ }
// for (var i = 0; i < 10; i++) {
//     test()     //  i = 0 0 i = 9 9 
// }


// console.log(test())   // 10

// var a = 1; 
// function test() {
//     a = 2;
//     return function () {
//         console.log(a);
//     }
//     var a = 3;
// }
// test()();

function foo(a, b) {
    console.log(b); 
    return {
        foo: function (c) {
            return foo(c, a);
        }
    }
}
// var func1 = foo(0); 
// func1.foo(1);    // 0
// func1.foo(2);    // 0
// func1.foo(3);    // 0
var func2 = foo(0).foo(1).foo(2).foo(3); 
var func3 = foo(0).foo(1); 
func3.foo(2);
func3.foo(3);


















