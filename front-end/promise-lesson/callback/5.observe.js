// //  观察者模式， 观察者和被观察者，有关联系的，观察者需要将自己放在被观察着之上，当被观察者状态发生变化，
// // 需要通知所有的观察者

// //  举个例子 ， 爸爸妈妈观察小宝宝的玩状态 开心 -> 不开心，需要通知爸爸妈妈
 

// class Subject{ // 被观察着（小宝宝是被观察者，开始的状态是不开心）
//     constructor(name){
//         this.name = name
//         this.state = '不开心',
//         this.observers = []
//     }
//     attach(o){  //  需要将注册放在自己的身上，同意才可以观察状态，允许某某观察
//         this.observers.push(o)   //  on
//     }

//     setState(state){   //  更新被观察的状态，并且通知观察者
//         this.state = state
//         this.observers.forEach(o=>{   // emit
//             o.update(this)
//         })
//     }
// }


// class Observer{  // 观察者  
//     constructor(name){
//         this.name = name
//     }
//     update(s){   //  等待被观察着状态变化时能被通知到, 调用这个方法
//         console.log(this.name + ':' + s.name + s.state)
//     }
        
// }

// let baby = new Subject('小宝宝')
// let parent = new Observer('爸爸')
// let mather = new Observer('妈妈')

// baby.attach(parent)
// baby.attach(mather)

// baby.setState('哈哈哈哈哈')








// ------------------------回顾----------------------

//  观察者模式 存在观察者和被观察着，，两者之间需要建立联系，才允许观察者关注被观察者，一旦被观察者状态发生改变会通知观察者更新


class Subject {   //  被观察着
    constructor (name){
        this.name = name
        this.state = '开心'
        this.observers = []
    }
    attach(o){  // 允许观察者观察 自身
        this.observers.push(o)
    }

    setState(state){   //  自身状态发生改变
        this.state = state 
        this.observers.forEach(o=>{
            o.update(this)
        })
        
    }
}

class Observer {  //  观察者
    constructor(name){
        this.name = name
    }

    update(s){
        console.log(this.name + s.name + s.state)
    }
}

let baby = new Subject('宝宝')
let mother = new Observer('妈妈')
let father = new Observer('爸爸')


baby.attach(mother)
baby.attach(father)

baby.setState('不开心')