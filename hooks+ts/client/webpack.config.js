const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// join 链接 只是机械的相连接，不解析真实路径
// resolve 要解析真实的路径，永远是一个相对于盘符根目录的绝对路径
module.exports = {
    // mode: 'development',  // 默认是开发模式
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
       path: path.resolve(__dirname, './dist'),
       filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer:{  // 
        hot: true,   //热更新，
        contentBase: path.resolve(__dirname, 'dist'),  // 基准路径，编译路口文件，起服务，以dist目录为静态目录
        historyApiFallback: { // browserHistory的时候，刷新会报404 自动重定向到index.html
            index: './index.html'
        }
    },
    resolve:{
        alias:{   // 别名
            "@": path.resolve(__dirname, 'src'),
            "~": path.resolve(__dirname, 'node_modules')
        },
        // 当加载一个文件的时候，如果没有指定的扩展名的时候，会自动寻找哪些扩展名
        extensions:['.ts', '.tsx', '.js', '.json']
    },
    module:{
        rules:[
            {
                test: /\.(j|t)sx?$/,
                loader:'ts-loader',
                exclude: /node_modules/
            },
            {   
                enforce: 'pre',
                test: /\.(j|t)sx?$/,
                loader:'source-map-loader',
            },
            {
                test:/\.css$/,
                use:['less-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpg|png|gif|svg|jpeg)$/,
                use:['url-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 热更新插件  和hot：true 配合起来用
        new webpack.HotModuleReplacementPlugin()
    ]
    
}