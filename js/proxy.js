
/**
 * Proxy 函数接受两个参数：
 *      1、target - 目标对象
 *  ·   2、handler - 配置对象，配置拦截的操作行为 
 * 
 * 注意⚠️：要使得Proxy起到作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作
 */


// var obj = new Proxy({},{
//     get: function(target, propKey, receiver){
//         console.log(target, propKey)
//         return Reflect.get(target,propKey, receiver)
//     },
//     set: function(target, propKey,value, receiver ){
//         console.log(`setting ${propKey}!`);
//         return Reflect.set(target, propKey, value, receiver);
//     }
// })

// obj.count = 1

//  ++obj.count

// var handler  = {
//     get: function(targe, propKey){
//         if(propKey === 'name'){
//             return console.log(targe[propKey])
//         } else if(propKey === 'age') {
//             return console.log(18)
//         } else {
//             console.log('!!!!Error')
//         }

//     },
//     set: function(){

//     } 
// }

// var proxy = new Proxy({
//     name:'ha'
// }, handler)


// proxy.age


function createArray(...elements) {
    let handler = {
      get(target, propKey, receiver) {
        let index = Number(propKey);
        console.log(target, propKey)
        if (index < 0) {
          propKey = String(target.length + index);
        }
        return Reflect.get(target, propKey, receiver);
      }
    };
  
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }
  
  let arr = createArray('a', 'b', 'c');

  console.log(arr[0])// c