class Promise {
    constructor(excurtor){
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        // 成功失败的数组
        this.onResolvedCallbacks = []
        this.onRejectCallbacks = []
        let resolve = (data) =>{
            if(this.status === 'pending'){
                this.status = 'resolved'
                this.value = data
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
            
        }
        let reject = (reason) =>{
            if(this.status === 'pending'){
                this.status = 'rejected'
                this.reason = reason
                this.onRejectCallbacks.forEach(fn=>fn())
            }    
        }
        try { //  执行可能发生异常
            excurtor(resolve,reject) 
        } catch (e) {
            reject(e)
        }
    }
    then(onFulFilled,onRejected){
        if(this.status === 'resolved'){
            onFulFilled(this.value)
        } 
        if(this.status === 'rejected'){
            onRejected(this.reason)
        } 
        if(this.status === 'pending'){
            this.onResolvedCallbacks.push(()=>{
                onFulFilled(this.value) 
            })
            this.onRejectCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}
module.exports = Promise