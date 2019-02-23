<!-- [TOC] -->
# 学习webpack指南中的demo，进行比较学习

## 须知
指南的所有的例子都是在webpack-demo中，其他的都是相应的扩展，可以单独查看（里面会有README的介绍)

## 各个目录知识点

### 安装
webpack4.x npm i -D webpack webpack-cli(不需要漏了webpack-cli))
**webpack默认只能处理js**

### 起步

#### 基本安装（script引入lodash）
通过script引入`lodash`，这样会产生一些问题：
+ 依赖：脚本执行依赖外部的扩展库
+ 顺序：依赖不存在，或则引入顺序错误，会报错
  > 越早的script越先执行，head里面的快于body里面的
+ 浪费：依赖被引入但是没有使用，浏览器还是会下载

#### 创建一个bundle文件(webpack引入lodash)
通过import引入lodash使用，这样避免了上面的问题，在需要的时候在引入
`npx webpack`生成打包文件main.js，具体步骤：
1. 默认是找src/index.js进行打包
2. 生成文件默认在dist/main.js,main.js是已经压缩过的
> webpack4默认使用的是production，所以做了很多优化。如果有配置文件，默认是找webpack.config.js

#### 模块
大多数浏览器都支持import和export，但是一些老的浏览器不支持，webpack已经做了兼容性方面的事情，具体的可以查看main.js.
> main.js 简单的import使用会直接进行转化
webpack默认的`只会解析import和export`，其他的es6方面的需要加载babel去转化

#### 配置文件
执行： npx webpack --config webpack.config.js
添加webpack.config.js添加一些参数
+ mode： webpack4默认的是production，这个默认自己做了很多的优化
+ entry： 进入
+ output： 输出

#### npm脚本
在scripts中添加命令，使用npm执行webpack，这样就不需要使用npx了，直接使用npx
> 如果npm想要给webpack传递参数，需要添加--然后传递`npm run build -- --config webpack.config.js`


### 管理资源

#### 加载css
1. npm i -D style-loader css-loader
  > css-loader 会把css打包进去，style-loader会把打包的css放进js里（可以把style-loader去掉查看效果，发现head中没有style）
2. module中加入loader和规则
3. 引入style.css(没有loader，import是会报错的，webpack默认引入的只有js)
4. 查看页面，会发现在head中添加了```<style>.hello{color:red}<style>```
  
> webpack-demo-css 是对于css的扩展，具体内容可以查看里面的REAdME

#### 加载图片
1. npm i -D file-loader
2. webpck配置 file-loader
3. build之后会生成相应的相应的图片，如果css引用，css-loader也会进行转化到相应的路径

> webpck-demo-img 是对于image的扩展，包括压缩和优化

#### 加载字体
file-loader和url-loader不仅可以加载图片，也可以加载其他文件，比如字体文件。
配置如图片

#### 加载数据
构建的时候就可以加入数据，不需要在发送http请求了
> 不使用webpack之前，是准们通过发送http请求来获取一个.json格式数据的

+ import的数据默认是Object格式的，可以直接使用
+ json格式的数据，webpack默认就能识别到
+ xml和csv(tsv)需要使用loader才能加载（xml-loader、csv-loader)

#### 全局资源
把所有文件都放在需要的目录里面，可以对比一下vue文件（vue-music的component）
**如何让文件的输出路径在不同文件夹下面了**
  > 可以设置各自不同的filename,里面就包含了路径，我们这里拿img来做测试

### 管理输出
在管理资源的基础上删除掉一些文件方便后续的扩展

#### 预先准备
1. 添加另外一个print.js文件
2. webpack根据entry名称，打包生成相应的文件
3. html中引用webpack之后的print.js和主文件

#### 设定HtmlWebpackPlugin
每次打包之后都要自己去修改html中的引入，很麻烦，所以使用HtmlWebpackPlugin进行自动引入
1. npm i -D html-webpack-plugin
2. webpack中配置plugin进行添加

[更多详细操作](https://github.com/jantimon/html-webpack-plugin)

#### 清理 /dist文件夹]
dist随着build文件越来越多，所以每次build之前最好进行清理
1. npm i -D clean-webpack-plugin
2. webpack-plugins-添加

#### Manifest
现在粗略的理解一下，后续有机会进行补充
1. 映射，记录过程
2. 跟缓存有关，如果没有，chunkhash有可能报错（不知道现在最新版本怎么样)


### 开发

准们为开发环境准备的webpack配置

#### 使用source map
要不然打包编译成一个bundle，会找不到具体报错我文件位置

开发环境使用的devtool配置（不会生成map，会直接嵌套在js文件中)
+ inline-source-map 不会生成单独的map文件，但是确实也是存在的
  > 报错就可以详细到具体位置，如果用cheap-module-eval-source-map,因为调试的时候常常调试不出来。

如果是生成环境devtool配置，可以使用cheap-module-source-map，build会生成.map的文件

#### 选择一个开发工具
1. webpack watch 自动生成，但会手动刷新
2. webpack-dev-server，自动刷新
3. webpack-dev-middleware 配合nodejs使用

#### 使用观察者模式
webpack --watch
优点：自动编译
缺点：
1. 需要自己刷新浏览器（有时候还需要自己清除缓存）
2. 还是要通过http-server启动查看html
