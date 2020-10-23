
let PENDING = 'PENDING'
let RESOLVED = 'RESOLVED'
let REJECTED = 'REJECTED'


class Promise {
    constructor(excutor) {  // 立即执行
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.resolveCallBacks = []
        this.rejectCallBacks = []
        let resolve = (data) => {
            if (this.state = PENDING) {
                this.state = RESOLVED
                this.value = data
                this.resolveCallBacks.forEach(fn=>{
                    fn(this.value)
                })
            }
        }
        let reject = (reason) => {
            if (this.state = PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.rejectCallBacks.forEach(fn=>{
                    fn(this.reason)
                })
            }
        }
        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onfulfilled, onrejected) {
        //  为了实现链式调用，创建一个新的promise并且返回
        let promise2 = new Promise((resolve, reject)=>{
            if (this.state === RESOLVED) {
                let  x = onfulfilled(this.value)
                resolve(x)
            }
            if (this.state === REJECTED) {
                let x = onrejected(this.reason)
                reject(x)
            }
            if(this.state == PENDING){
                this.resolveCallBacks.push(()=>{
                    onfulfilled(this.value)
                })
                this.rejectCallBacks.push(()=>[
                    onrejected(this.reason)
                ])
            }
        })
        return promise2
    }
}

module.exports = Promise
