const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
console.log('process.env.test:', process.env.test)
module.exports = merge(common, {
    mode: 'development', // 默认会设置 new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'})
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.test': JSON.stringify('test') // 可以注释掉查看 index.js 中是否可以获取到该值
        }),
    ]
})