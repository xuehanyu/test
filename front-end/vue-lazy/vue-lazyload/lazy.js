import { throttle } from 'lodash' 
export default ( Vue )=>{
    class ReactiveListener{ // 创建图片实例
        constructor({el, src, options, elRenderer}){
            this.el = el
            this.src = src,
            this.elRenderer = elRenderer
            this.options = options
            this.state = {
                loading : false
            }
        }
        catInView(){  // 判断当前图片是否在可视区域
            let { top } = this.el.getBoundingClientRect()
            return top < window.innerHeight * this.options.preLoad
        }
        load(){
            this.elRenderer(this, 'loading')
            this.asyncImage(this.src, ()=>{
                this.elRenderer(this, 'loaded')
                this.state.loading = true
            },()=>{
                this.elRenderer(this, 'error')
            })
        }
        asyncImage(src, resolve, reject){
            let img = new Image()
            img.src = src
            img.onload = resolve
            img.onerror = reject
        }
    }
    return class LazyClass{
        constructor(options){
            this.options = options
            this.listenerQueue = []
            this.bingdingHandler = false
            this.lazyloadHandler = throttle(()=>{
                //  判断每个图片是否真正在可视区域
                let catIn = false  // 定义一个变量 ，默认不再可视范围内
                this.listenerQueue.forEach(listener => {
                    if(listener.state.loading) return 
                    catIn = listener.catInView()
                    catIn && listener.load()  // 如果在可视范围内，则去加载图片
                })
            },200)
        }
        add(el, bindings){
            // 1、找到滚到的父级，监听scroll事件，当滚动的时候，来检测当前的图片是否在可视区域内
            // 2、为每个图片创建一个新的类，用以保存相关信息，判断是否在可视区域内
            // 此el并不是真正的dom
            Vue.nextTick(()=>{
                function scrollParent(){
                    let parent = el.parentNode
                    while(parent){
                        if(/scroll/.test(getComputedStyle(parent)['overflow'])){
                            return parent
                        }
                        parent = parent.parentNode
                    }
                    return parent
                }
                let parent = scrollParent()

                let src = bindings.value
                // 判断当前这个图片是否要加载， 给每个图片都创建一个实例，当滚动的时候，判断该图片实例是否在这个区域内
                let listener = new ReactiveListener({
                    el, // 真实节点
                    src, //图片的路径
                    //渲染方法
                    elRenderer: this.elRenderer.bind(this),
                    options: this.options
                })
                this.listenerQueue.push(listener)  // 将每个listener都存放在当前实例上，当滚动的时候能拿到
                if(!this.bingdingHandler){
                    this.bingdingHandler = true
                    parent.addEventListener('scroll', this.lazyloadHandler)  // 滚动时
                }
                
                // 默认需要进行一次判断
                this.lazyloadHandler()
            })
        }
        elRenderer(listener, state){  // 根据图片状态渲染相应图片
            let src = ''
            switch (state) {
                case 'loading':
                    src = listener.options.loading || ''
                    break;
                case 'error':
                    src = listener.options.error || ''
                    break;
                default:
                    src = listener.src
                    break;
            }
            listener.el.setAttribute('src', src)
        }
    }
}