// function add (a,b){
//     return a + b
// }

// function partial(fn,a) {
//     return function(b){
//         return fn(a,b)
//     }
// }

// let result = partial(add,1)
// let addOne = add.bind(null,1)
// console.log(addOne(5))
// console.log(result(8))

// function partial(fn){
//     var args = [].slice.call(arguments,1)
//     return function(){
//         var newArgs = args.concat([].slice.call(arguments))
//         console.log(this)
//         return fn.apply(this, newArgs)
//     }
// }

// function add (a, b){
//     console.log(this.value)
//     return a + b + this.value
// }

// var addOne = partial(add,1)
// let resul = add.bind(null,3)
// var value = 1
// var obj = {
//     value:2,
//     addOne: addOne
// }

// // console.log(obj.addOne(8))
// // console.log(resul)
function getPersonInfo(one, two, three) {
    console.log(one);
    console.log(two);
    console.log(three);
  }
  
  const person = "Lydia";
  const age = 21;
  
getPersonInfo`${person} is ${age} years old`;


