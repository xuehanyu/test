let arr: [number, string] = [2, 'hello']

let num: number = 1
num = null

function fn() {
    console.log('111')
}

let r = fn()

enum Color {
    Red = 2,
    Green
}
let c: Color = Color.Green
console.log(c)


function error(message: string): never {
    throw new Error(message)
}
let result = error('sd')


function fail() {
    return error("Something failed");
}

function infiniteLoop(): never {
    while (true) {
    }
}
