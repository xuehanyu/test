var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function flat(arr, depth = 0){
    return depth <0 ? arr : arr.reduce((pre, cur)=>{
        return pre.concat(Array.isArray(cur) ? flat(cur, depth-1) : cur)
    }, [])
}

let result = flat(arr, Infinity)
console.log([...new Set(result.sort((a, b)=>{
    return a-b
}))])