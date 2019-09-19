const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost' // 不可少，否则报错
}

// HMR入口点
webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', function() {
    console.log('dev server listening on port 5000!')
})