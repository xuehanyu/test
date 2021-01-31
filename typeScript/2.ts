class Greeting {
    greeting: string
    constructor(greeting: string) {
        this.greeting = greeting
    }
    greet() {
        return `hello ` + this.greeting
    }
}


let greeter = new Greeting('world')


interface A {
    name: string
}

interface A {
    nam: number
}