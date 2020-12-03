const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const VueServerRender = require('vue-server-renderer/client-plugin') // 
module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname,'../src/entry-client.js'),
    },
    
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'client.html',
            template: path.resolve(__dirname, '../public/client.html')
        }),
        new VueServerRender()
    ]
})