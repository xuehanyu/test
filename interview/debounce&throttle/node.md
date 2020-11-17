### 性能优化
- 优化高频率事件 onscroll oninput resize onkeyup keydown... 降低代码执行频率
- 页面展示过程
    javascript -> style -> layout -> paint -> composite

    js 动画/往网页里面添加一些dom元素
    style确定每个dom应该用什么样式
    layout布局，结算最终显示的位置和大小
    pait绘制dom，在不同上绘制
    composite渲染曾合并