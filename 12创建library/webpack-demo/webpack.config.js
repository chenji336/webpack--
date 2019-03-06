var path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumbers', // script中调用也可以使用这个名称，window中带的
        libraryTarget: 'umd', // 兼容AMD和CommonJS(script引入也需要这个)
        // globalObject: 'this',  // 避免出现window is undefined
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
}