let a = [1,2,[3,5,[6,7,8]]]

//  利用concat可以展开一曾
// let arr1 = [].concat(...arr)

function myFlat(arr, depth = 1){
    return depth > 0 ? arr.reduce((pre, cur) =>pre.concat(Array.isArray(cur) ? myFlat(cur,depth-1) : cur ) ,[] ) : arr
}


function selfFlat(arr=[], depth = 1){
    let result = [];
    (function flat(arr,depth){
        arr.forEach(item => {
            if(depth>0 && Array.isArray(item)){
                flat(item, depth-1)
            } else {
                result.push(item)
            }
        });
    })(arr, depth)
    return result
}

console.log(selfFlat(a, 10))