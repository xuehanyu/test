export { }
// 差集，A-B 找出A中有 B中没有的  SetDifference === Exclude
type SetDifference<A, B> = A extends B ? never : A

type A = string | number
type B = number | boolean
type AB = SetDifference<A, B>


// Omit 忽略某个属性
type Exclude<T, U> = T extends U ? never : T;

// k---age                                  name|age|visible age  =>>>  name|visible
type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;

type Props = { name: string, age: number, visible: boolean }

type OmitAgeProps = Omit<Props, 'name'>


// Diff
namespace a {
    type Props = { name: string, age: number, visible: boolean }
    type DefaultProps = { age: number }
    type Diff<T, U> = Pick<T, SetDifference<keyof T, keyof U>>;
    type DiffProps = Diff<Props, DefaultProps>
}


// 交叉属性
namespace b {
    type Props = { name: string, age: number, visible: boolean }
    type DefaultProps = { age: number }
    type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>
    type DuplicateProps = InterSection<Props, DefaultProps>
}


namespace c {
    // overWrite  覆盖 不添加
    type Diff<T, U> = Pick<T, SetDifference<keyof T, keyof U>>;
    type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>

    type OverWrite<
        T extends object,
        U extends object,
        I = Diff<T, U> & InterSection<U, T>
        > = Pick<I, keyof I>
    type Props = { name: string, age: number, visible: boolean }
    type newProps = { name: number, other: string }
    // { name: number, age: number, visible: boolean  }
    type ReplaceProps = OverWrite<Props, newProps>

}


namespace d {
    // merge 合并
    type O1 = {
        id: number,
        name: string
    }
    type O2 = {
        id: number,
        age: number
    }
    type Compute<A extends any> = A extends Function ? A : { [k in keyof A]: A[k] }
    type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;
    type Merge<O1 extends object, O2 extends object> = Compute<O1 & Omit<O2, keyof O1>>
    type R2 = Merge<O1, O2>

}