### 服务端渲染 ssr
- vue单应用 在浏览器进行渲染
- 服务器端渲染，在服务器端将对应的数据请求完，在后端拼装好页面返回给前端
- 客户端渲染不利于seo优化，服务器端渲染的结果可以被浏览器抓取到
- ssr 缺陷是占用大量cpu和内存
- 客户端渲染可能会出现白屏，ssr 可以减少白屏事件
- API不能用，在服务端没有dom概念，只支持beforeCreate created生命周期


- npm install vue vue-router vuex vue-server-renderer(vue 服务端渲染插件)
- npm install koa(node的框架) koa-router(后端路由) koa-static（后端返回的静态页面）


## webapck 打包文件

- webpack(核心打包用)  webpack-cli(解析命令行can 睡)  webpack-dev-server(在开发环境下帮我们提供一个开发环境 支持更新)
- babel-loader（webpack和babel的一个桥梁） @babel/core（babel的核心模块） @babel/preset-env(可以把高级语法转换成es5语法) 
style-loader 不支持服务器端渲染
- vue-style-loader(vue解析样式 插入到页面中)  css-loader
- vue-loader(template编译render函数) vue-template-compiler