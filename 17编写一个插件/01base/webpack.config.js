const path = require('path')
const HelloWorldPlugin = require('./src/01base')
const HelloCompilationPlugin = require('./src/02compilation')
const HelloAsyncPlugin = require('./src/03tapAsync.js')
const HelloPromisePlugin = require('./src/04tapPromise.js')
const FileListPlugin = require('./src/05fileListPlugin.js')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    // 测试loader和plugin的先后顺序
    rules: [{
      test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, 'src/loader.js'),
          options: {
            name: 'Chenji'
          }
        }
    }]
  },
  plugins: [
    new HelloWorldPlugin({ 
      options: true
    }),
    new HelloCompilationPlugin(),
    new HelloAsyncPlugin(),
    new HelloPromisePlugin(),
    new FileListPlugin()
  ]
}