const data = [
    {
        name: 'Peter',
        sex: 'M',
        age: 18,
        grade: 99
    },
    {
        name: 'Jack',
        sex: 'M',
        age: 12,
        grade: 69
    },
    {
        name: 'Jhon',
        sex: 'M',
        age: 16,
        grade: 6
    },
    {
        name: 'Jessica',
        sex: 'F',
        age: 20,
        grade: 18
    },
    {
        name: 'lisa',
        sex: 'F',
        age: 17,
        grade: 80
    },
    {
        name: 'Vic',
        sex: 'F',
        age: 15,
        grade: 80
    },
    {
        name: 'Cindy',
        sex: 'F',
        age: 25,
        grade: 90
    },
    {
        name: 'Angel',
        sex: 'F',
        age: 8,
        grade: 9
    },
    {
        name: 'Tian',
        sex: 'M',
        age: 13,
        grade: 9
    }
]

class R {
    // 对象操作（最后一个参数是对象），均会返回新的对象拷贝
    static prop(name, obj){  // 获取对象 name 字段的值
        return obj[name]
    }
    static propEq(name, value, obj){  // 判断对象 name 字段是否等于‘123’
        return obj[name]  === value
    }
    static assoc(name, newValue, obj){  // 更新对象的'name'的值为'123'
        return { ...obj, [name]: newValue }
    }
    static pick(props, obj){   // R.pick(['a', 'd']); //=> {a: 1, d: 4}  获取对象某些属性，如果对应属性不存在则不返回
        let newO = {}
        for(let i=0; i<props.length; i++){
            let key = props[i]
            if(obj[key]) newO[key] = obj[key] 
        }
        return newObj
    }

    static pickAll(props, obj){ // R.pickAll(['a', 'd']); //=> {a: 1, d: 4}  // 获取对象某些属性，如果对应属性不存在则返回`key : undefined`
        let newO = {}
        for(let i=0; i<props.length; i++){
            let key = props[i]
            newO[key] = obj[key] ?  obj[key] : 'undefined'
        }
        return newObj
    }
    // 数组操作
    static map(arr){  // 传统的 map 操作
        return Array.prototype.map.call(arr)
    }
    static filter(arr){  // 传统的 filter 操作
        return Array.prototype.filter.call(arr)
    }
    static reject(){   //filter 的补集

    }
    static take(){   //取出数组前 n 个元素

    }

    //比较操作
    static equals(a, b){   // 判断a是否等于b
        return a === b
    }
    static gt(a, b){   // R.gt(2, 1) => true  // 判断第一个参数是否大于第二个参数
        return a > b
    }
    static lt(a, b){   // R.gt(2, 1) => false  // 判断第一个参数是否小于第二个参数
        return a < b
    }

    // 排序操作
    static sort(func){  //根据某个排序函数排序

    }
    static ascend(func){  // 根据 func 转换后的值，生成一个升序比较函数

    }
    static descend(func){  // 根据func转换后的值，生成一个降序比较函数

    }
    // 例子：
    // R.sort(R.ascend(R.prop('age')))  // 根据 age 进行升序排序 

    // 必备函数
    static pipe(...fns){  //compose 的反向，从前往后组合
        return (...args) => fns.reduce((val, fn)=>fn.apply(null, [].concat(val)), args)
    }
    static compose(...fns){   // 从后到前组合
        return (...args) => fns.reduceRight((val, fn)=>fn.apply(null, [].concat(val)), args)
    }
    static curry(fn){ // 柯里化
        const  length = fn.length
        const args = [].slice.call(arguments, 1)
        return function(){
            const innerArgs = [].slice.call(arguments)
            const all =  [...args, ...innerArgs]
            if(all.length === length){
                fn(...all)
            } else {
                return curry(fn, all)
            }
        } 
    }  
}