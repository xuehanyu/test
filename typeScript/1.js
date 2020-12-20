let obj = {
    name: '2',
    age: 10
}


let newObj = new Proxy(obj, {
    get(target, key) {
        return target[key]
    }
})

console.log(newObj.name)