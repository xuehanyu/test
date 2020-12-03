const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const VueServerRender = require('vue-server-renderer/server-plugin') // 
module.exports = merge(base, {
    mode: 'development',
    entry: {
        server: path.resolve(__dirname,'../src/entry-server.js'),
    },
    target: 'node',  // 输出的文件是给node来使用的，不需要打包node自带的模块 let fs = require('fs ')
    output:{
        libraryTarget: 'commonjs2'   // 导出的方式是用node module.exports = 导出的入口的函数
    },
    plugins:[
        new VueServerRender(),
        new HtmlWebpackPlugin({
            filename: 'server.html',
            template: path.resolve(__dirname, '../public/server.html'),
            excludeChunks: ['server']   // 打包后的html不需要引入server.js
        })
    ]
})