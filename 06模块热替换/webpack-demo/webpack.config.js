const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        // print: './src/print.js' // 不注释掉可以看看效果（改变printMe里面内容，不会进行热更新）
    },
    devtool: 'inline-source-map', // 不建议使用cheap-module-eval-source-map
    devServer: {
        contentBase: './dist', // 如果没有publicPath，那么contentBase不起作用
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [ // 放在entry后面和output前面，应该是说plugin是对entry进行操作的，顺序是在output之前
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'HMR'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'), // 要求必须是absolute path
        publicPath: '/'
    },
}
