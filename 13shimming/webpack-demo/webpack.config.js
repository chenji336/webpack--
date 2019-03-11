const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: require.resolve('./src/index.js'), // 效果跟path.resolve(__dirname, './src/index.js)一样
                use: 'imports-loader?this=>window'
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