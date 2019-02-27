const path = require('path')
// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

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
                include: path.resolve(__dirname, 'src'),
                sideEffects: false
            }
        ]
    },
    plugins: [
        // new WebpackDeepScopeAnalysisPlugin()
    ]
}