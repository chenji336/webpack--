const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        polyfill: './src/polyfill.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // {
            //     test: require.resolve('./src/index.js'), // 效果跟path.resolve(__dirname, './src/index.js)一样
            //     use: 'imports-loader?this=>window'
            // },  // 和 export 一同使用产生bug
            { 
                test: require.resolve('./src/global.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // _: 'lodash'
            join: ['lodash', 'join'] // 按需引入
        })
    ],
}