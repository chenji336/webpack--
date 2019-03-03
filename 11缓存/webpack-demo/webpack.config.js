const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    plugins: [ // 放在entry后面和output前面，应该是说plugin是对entry进行操作的，顺序是在output之前
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'cache'
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js', // 如果没有名字会默认使用filename名称
        path: path.resolve(__dirname, 'dist') // 要求必须是absolute path
    },
    optimization: {
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
}
