
import {observe} from './index'
import {arrayMethod, observeArray} from './array'

function defineReactive(data, key, value){
    // console.log(value,'000')
    observe(value)
    Object.defineProperty(data, key, {
        get(){
            console.log('获取数据')
            return value
        },
        set(newValue){
            console.log('设置数据')
            if(value === newValue) return 
            value = newValue
        }
    })
}

class Observe{
    constructor(data){  // vm._data
        if(Array.isArray(data)){
            data.__proto__ = arrayMethod
            observeArray(data)
        }else{
            this.walk(data)
        }
    }

    walk(data){
        let keys = Object.keys(data)
        for(let i=0; i<keys.length; i++){
            let value = data[keys[i]]
            defineReactive(data, keys[i], value)
        }
    }
}

export default Observe