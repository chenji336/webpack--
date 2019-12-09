const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'production', // 设置production是为了查看vendor的hash根据import print而变化
    entry: {
        app: './src/index.js',
    },
    plugins: [ // 放在entry后面和output前面，应该是说plugin是对entry进行操作的，顺序是在output之前
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'cache'
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js', // 如果没有名字会默认使用filename名称
        path: path.resolve(__dirname, 'dist') // 要求必须是absolute path
    },
    optimization: { // 类似 webpack3 webpack.optimize.CommonChunkPlugin
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // 把node_modules的文件都进行打包成一个
                    chunks: 'all',
                    name: 'vendors'
                }
            }
        }
    }

//     optimization: {
//         splitChunks: {
//             cacheGroups: {
//                 vendor: { // 抽离第三方插件
//                     test: /node_modules/, // 指定是node_modules下的第三方包
//                     chunks: 'initial',
//                     name: 'vendor', // 打包后的文件名，任意命名
//                     // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
//                     priority: 10
//                 },
//                 commons: { // 抽离自己写的公共代码，commons这个名字可以随意起
//                     chunks: 'initial',
//                     name: 'commons', // 任意命名
//                     minSize: 0 // 只要超出0字节就生成一个新包
//                 }
//             }
//         }
//     },
}
