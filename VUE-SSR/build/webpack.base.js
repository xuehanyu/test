const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode:'development',
    output:{
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
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
        new VueLoaderPlugin()
    ]
}