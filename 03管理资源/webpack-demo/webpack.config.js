const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false, // 默认是 false
                            
                            /**** css module配置 ****/
                            modules: true,
                            localIdentName: '[path]-[name]-[hash:base64:5]',
                            camelCase: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            /*
                            * 会发现img是相对于output里面的路径
                            * 输出：dist/img/icon-17b1b9.png
                            */
                            name: 'img/[name]-[hash:6].[ext]'
                        }
                    }

                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
}