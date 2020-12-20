/**泛型 */

// 1、创建一个长度为length的数组，里面的值用value填充

function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

let r = createArray<string>(6, 'hello')


// 2 类数组