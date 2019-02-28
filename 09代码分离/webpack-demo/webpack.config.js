const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        other: './src/another-module.js'
    },
    plugins: [ // 放在entry后面和output前面，应该是说plugin是对entry进行操作的，顺序是在output之前
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '代码分离'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist') // 要求必须是absolute path
    },
}
