let arr = [1,2,3,4]


Array.prototype.myReduce = function(fn, pre){
    let arr = Array.prototype.slice.call(this)
    console.log(arr,'arr')
    for(let i=0; i<this.length; i++){
        if(typeof pre==='undefined'){
            pre = fn(this[i], this[i+1],i+1,this)
            ++i
        } else{
            pre = fn(pre, this[i], i, this)
        }
    }
    return pre
}
const result = arr.myReduce((pre,cur)=> pre+cur, 0)

console.log(result)