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

#### 使用webpack-dev-server
优点：
1. 会自动刷新浏览器
2. 默认启动一个8080端口的服务（当然也可以自己设置port)
缺点：
每次都要刷新浏览器，这样每次都不能保存当时状体了，后续热块热替换部分会进行解决

使用：
1. npm i -D webpack-dev-server
2. devServer: {contentBase: './dist'} (devServer S是大写)
3. webpack-dev-server --open 自动打开

[更多的配置](https://webpack.docschina.org/configuration/dev-server)

> 额外篇章，contentBase引起的思考，具体作用？然后引出对比path和publicPath.[文章](https://juejin.im/post/5bb085dd6fb9a05cd24da5cf)。
  顺带的思考下怎么样自动打开网页，但是发现已经打开则只是进行跳转？

#### 使用webpack-dev-middlware

webpack-dev-middleware是一个容器，它可以把webpack处理后的文件传递给一个服务器
webpack-dev-server内部使用了webpack-dev-middleware

配合express使用：
1. npm i -D express webpack-dev-middleware
2. express().use webpackDevMiddleware中间件，记得配置publicPath

缺点： 配合express使用，修改页面的时候不会自动刷新，需要手动自己刷新浏览器。可以参考使用webpck-hot-middleware解决

## 模块热替换
不需要重新刷新浏览器，会保留之前的状态
> webpack中默认只能对js有效，如果用了jsx之类的需要使用插件来解决
[原理篇](https://zhuanlan.zhihu.com/p/30669007)

#### 启用HMR
1. devServer.hot=true
2. plugins.push(new webpack.HotModuleReplacement())
3. index.js文件中使用module.hot监听改变的文件
4. 只能监听自己bundle中的文件（所以开头需要让print.js被打包跟index.js一样的bundle里面)

**问题**
> 发现我修改了printMe里面的内容，我在点击的时候发现是没有改变的

#### 启用Node.js API
1. node使用webpack-dev-server
2. 使用HMR就不能把devServer放在config中，而应该单独的提出来使用
3. 包含HMR入口点，可以使用webpack.addDevServerEntrypoints方法

#### 问题
就是启动HMR中遇到的，点击时候不能更新
解决： 在hot.accept的时候移除旧的事件，添加新的事件
以后很多地方不需要这样手动的处理，因为存在很多loader可以帮我们处理掉

#### HMR修改样式
样式的修改之后一般情况下需要我们刷新浏览器，但是借助于style-loader,当样式改变时候，style-loader会在**后台使用module.hot.accept**帮我们修补（patch）`<style>`标签