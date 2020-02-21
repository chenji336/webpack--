const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/example.txt', // 验证example会被打包成js，配合webpack library配置，暴露 export default
    // entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // libraryTarget: 'umd', // 兼容AMD和CommonJS(script引入也需要这个)
        // globalObject: 'this',  // 避免出现window is undefined
    },
    module: {
      rules: [{
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, 'src/loader.js'),
          options: {
            name: 'Chenji'
          }
        }
      }]
    }
}