/**泛型的定义 */
export {}
function identity(arg: number): number {
    return arg
}

function identify1(arg: any): any {
    return arg
}

// 因此我们需要一种方法使返回值的类型与传入参数的类型的相同，这里就使用了类型变量， 
// 它是一种特殊的变量，只用于表示类型而不是值
// 类型变量T，T帮助我们捕获用户的传入类型，之后就可以使用这个类型
function identity2<T> (arg: T): T {   // 泛型， 可以适用多个类型
    return arg
}

let r = identity2<boolean>(true)
let r1 = identity2('sss')   // 类型推论


/**使用泛型变量 */

// 适用泛型创建像上述泛型函数时，编辑七要求你在函数体必须正确的适用这个通用的类型，就是
// 你必须把这些参数当作使任意活着所有类型
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length)  // property 'length' does not exist on type 'T'
    return arg
}
// 此函数接受类型参数T和参数arg， 它是一个元素类型是T的数组，并且返回元素类型是T的数组
// 这样可以让我们把泛型变量T当作类型的一部分适用，而不是整个类型，增加了灵活性
function loggingIdentity1<T>(arg: T[]): T[] {
    console.log(arg.length)  // 
    return arg
}

/** 泛型类型*/




