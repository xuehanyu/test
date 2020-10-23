function sleep (wait){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve, wait)
    })
}
async function main(n){ 
    for(let i=1;i<n; i++){
        console.log(i)
        await sleep(i * 1000)
    }
}
main(10000)