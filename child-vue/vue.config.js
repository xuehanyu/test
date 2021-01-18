module.exports = {
    configureWebpack:{
        output:{
            library: 'singleVue',
            libraryTarget: 'umd'
        }
    },
    devServer:{
        port:10000
    },
}

// 使用umd的好处是， 将暴露出来的三个方法 挂载到window的属性上 
// window.singleVue.bootstrap/mount/unmount