##  安装vue-cli
```
    npm install @vue/cli -g
```

## 快速原型工具（可以帮我们直接解析.vue文件）
```
    npm install @vue/cli-service-global -g
    vue serve main.js
```

## 传递方法
1、属性 和方法直接传入
2、属性 和 $emit()
3、同步数据 v-model / .sync
4、跨级传递数据 provide 、 inject  会造成单向数据流混乱，自己实现工具库，需要采用这个方式
5、$parent、$children 可以直接触发儿子的事件或者父亲的事件 （尽量不要使用，因为不知道父级和子级是谁，防止代码不好维护）
    耦合性高，需要知道触发哪个父亲，需要一一对应，可以使用$dispatch 向上派发，使用$broadcast向下广播 自定义挂载原型上的方法

6、$attrs、$listeners 表示所有的属性和方法的集合  v-bind="$attrs" v-on="$listeners"

7、ref 操作dom元素，当前组件的实例，可以获取当前组件的数据
    在普通元素上可以获取dom元素， 在v-for里面，获取的是一组dom/组件实例，，在组件上，当前组件的实例

8、兄弟组件间通信，找到兄弟的共同父亲来通信，，
    eventBus 事件车，发布订阅模式，在任何组件中订阅，在其他组件中可以触发事件， 通过vue的实例
    子组件如何监听父组件的mounted事件？
    组件挂载 是先挂载父组件 =》 渲染子组件 =》 子组件mounted =》父组件mounted

    eventBus 可以任意组件间通信 知识和小规模项目 通信（大规模会导致事件不好维护重名， vuex） 


##  校验的库 async-validator