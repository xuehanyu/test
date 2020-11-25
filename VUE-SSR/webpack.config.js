const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname,'src/main.js'),
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',  // 默认调用@babel/core
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue/,
                use: 'vue-loader'  
            },
            {
                test: /\.css/,
                use: ['vue-style-loader','css-loader']  
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new VueLoaderPlugin()
    ]
}