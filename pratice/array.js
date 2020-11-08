// 实现map
let arr = [1,2,3,4];
Array.prototype.myMap = function(fn){
    // 当前this 指的是调用的arr
    let arr = []
    for(let i=0; i<this.length ; i++){
        if(!this.hasOwnProperty(i)) continue 
        arr.push(fn(this[i], i, this))
    }
    return arr
}

let newArr = arr.myMap(item => item*2)

console.log(newArr, arr)