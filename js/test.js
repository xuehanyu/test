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


























