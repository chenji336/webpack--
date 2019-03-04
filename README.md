[TOC]
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

#### 清理 /dist文件夹
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

### 模块热替换
不需要重新刷新浏览器，会保留之前的状态
> webpack中默认只能对js有效，如果用了jsx之类的需要使用插件来解决
[原理篇](https://zhuanlan.zhihu.com/p/30669007)
1. webpack-dev-server依赖webpack-dev-middle,webpack-dev-middle缓存技术依赖memory-fs。
2. 通过websocket发送hash的变化，通知是否应该更新。如果需要更新再通过jsonp进行拉取最新的模板。不通过websocket的是因为各司其职。而且webpack-hot-middle也不是通过websocket进行推送的，是通过EventSource

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


### tree shaking
没有使用的代码（import但没有使用的或则没有import的模块中的方法），都不放在打包文件中（把树的死叶子全部摇晃下来）
> 代码最开始是跟02起步一样的

#### 添加一个通用模块
1. A模块中export两个方法m1、m2
2. B模块中引用A模块的一个m1方法
3. 打包
4. bundle中既然有两个方法，但是我不需要m2啊
> 例子中可以看到square没有引用却在bundle中有

#### 将文件标记为无副作用[side-effect-free]
理解：无副作用表示我可以删除掉没有引用和使用的方法以及模块

使用：
+ 在package.json中标记'sideEffects': true，就可以全部为无副作用
+ 在module.rules中可以标记sideEffects

易错点：
如果import的是polyfill或则css，则需要把这些排除在外，否则也会被删除（这些都是有副作用的）
> polyfill的副作用是改变全局原型；css的副作用是添加样式

误区：
只有sideEffects是不能进行删除的，还需要配合`压缩代码`(比如使用uglifyJSPlugin)

#### 压缩输出
开启uglifyJSPlugin(推荐两种方法）:
1. 设置mode: 'production'
2. webpack --optimize-minimize

**发现sideEffects写在package.json中无效**
误区：不是自己这个package.json的sideEffects,而应该是别的库的sideEffects(比如lodash的sideEffects)
1. lodash的package默认没有sideEffects
2. 所以引入lodash，但是没有使用，还是会打包引入
3. 在node_module中找到lodash>package,然后添加sideEffects:false
4. 可以发现第二步的问题解决了，引入没使用则不会打包进去
[lodash vs lodash-es](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark)
[tree shaking缺陷和解决方案](https://juejin.im/post/5b8ce49df265da438151b468)

### 生产环境构建

#### 配置
1. npm i -D webpack-merge,用来合并代码
2. 分成是那个文件： webpack.common.js webpack.dev.js webpack.prod.js
3. common是公用部分  dev和prod分别是开发和生产环境部分
> 如果git reset 到这个版本，会有问题，因为不小心删掉了webpack.common.js，需要注意下

#### NPM Scripts
配置package的script
1. webpack-dev-server --open --config webpack.dev.js
2. webpack --config webpack.prod.js

#### source map
生产环境使用的source map是devtool:'source-map'
> 教程中引用uglifyJSPlugin，然后设置其sourceMap:true,没有太明白意义。因为在production环境下已经会使用uglify了

#### 指定环境

```js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
})
```
等价于 NODE_ENV=production node index.js

使用：process.env.NODE_ENV

优势： 很多库会根据是生产环境来进行代码的优化，如果使用的是react，会发现production打包的时候会小很多

#### 压缩css
很多人说使用css-loader.options.minimize:true,这个在高版本中是无效的

推荐使用：optimize-css-assets-webpack-plugin
如果使用复杂点可以配合cssnano使用

[使用](https://blog.csdn.net/weixin_36185028/article/details/82182352)

#### CLI替代选项
mode:'production' => webpack -p
启用ugnifyJs => webpack--optimize-minimize 
new DefinePlugin({xxxxx}) => --define process.env.NODE_ENV="'production'"

当mode:production已经包含来ugnifyJS和DefinePlugin

### 代码分离
代码拷贝自04管理输出

三种代码分离的方法：
+ 入口起点：使用 `entry` 配置手动的分离代码
+ 防止重复： 使用 `SplitChunks` 去重和分离chunk
+ 动态倒入： 通过模块的内联函数调用来分离代码
  > 动态导入的时候看看是不是有重复代码，如果有使用 防止重复 看看

#### 入口起点
这个是最简单的方法，只要在entry引入就行，不过缺点也很明显
1. lodash在两个模块中重复引入了
2. index.js如果想要动态引入print.js，这种方法不好弄

#### 防止重复
解决上面lodash多次引入问题

webpack4 使用SplitChunksPlugin代替了CommonChunksPlugin

如果有公用的代码，那么则会生成vendors~app~other.bunld.js(证明app和other有公用的，如果多个则多个连接)
  > 可以通过splitChunks.name 来进行重命名的，也可以把多个vendors~app合成一个

#### 动态导入
  >因为动态导入的demo需要删除一些文件和代码，为了以后更好的查看demo，所以添加了一个webpack-demo+动态导入

动态导入分有两种方法：
1. es6的import
  > import调用会在内部使用promise，所以旧版本浏览器需要引入一个polyfill(promise-polyfilll或es6-promise)
2. webpack自带的require.ensure

实现步骤：
1. output中添加`chunkFilename: 'xxx'`: 非入口chunk的名称；如果没写默认使用filename
2. 代码中import动态引用文件
  + 如果不想要[id].bundle.js，需要使用/* webpackChunkName:'xxx' */
  + 引入自己的文件前面不会有vendors~,如果是lodash就会有
  + 引入之后，需要添加**.default**,了解成require之后默认没有default就好
    > lodash没有可不加 ._default是因为 _.join方法也被export出来了

使用async方法改造代码使用（promise换成async）

#### preload和prefecth
webpack4.6.0+才支持；我现在使用的版本是4.29.6 (29>6)
[更详细文章](https://www.zcfy.cc/article/link-rel-prefetch-preload-in-webpack)

#### bundle分析
推荐使用webpack-bundle-analyzer


### 懒加载

懒加载跟按需加载其实没啥不同，不过本例通过点击事件触发懒加载
懒加载一般用于路由切换
按需加载一般是组件的（比如antd的组件我们就是按需加载）

#### 示例
按需加载引入一次就不会在进行加载了（可以查看network）


### 缓存
通过hash值来控制缓存

#### 输出文件的文件名

添加chunkhash修改输出的文件名，这个会根据自己文件生成hash
不要使用[hash],因为这样全局的hash保持一致。比如修改了index.js内容，lodash的hash也会变

#### 提取模板
把一些通用的部分提取出来
+ optimization.runtimeChunk可以提取runtime的公用代码,build之后多出bundle.[chunkhash].js
  > runtime代码就是每次打包生成最上面的function，每个入口都会包含进去，所以打包成一个chunk会减少size
+ optimization.splitChunks.cacheGroups作用
  1. 覆盖splitChunks.*
  2. test、priority and reuseExistingChunk 只能在cacehGroups中使用
  3. 可以按照文件来进行依赖生成（生成多个vendor文件）
  4. 第三条不确定，后续使用到在补充 [实践](https://zxc0328.github.io/2018/06/19/webpack-4-config-best-practices/)

#### 模板标示符
这章的翻译用的还是之前的老版本的，建议直接看英文版本 时间：2019-3-3

`为啥要标识符`：import 新文件，本来只应该修改main.js的hash，但是却会影响vendor.js的hash，这个不是我们想要的。比如import print,那么相应的module id就变了，就算是chunkname也会有问题，最好是根据路径来，而不是id
  > 注意：一定要在mode:production，如果是在开发环境是看不到效果的，切记！！！！

`解决`：new webpack.HasedhModuleIdsPlugin()



### 创建library
可以理解成创建自己的npm包（也可以发布到unpkg.com上）

#### 创建一个library
创建过程很简单，就是export方法给别人使用

主要关注如何引用：
+ ES2015模块导入
  > import * as webpackNumbers from 'webpack-numbers'
+ commonJS模块导入
  > const webpackNumbers = require('webpack-numbers')
+ AMD模块导入
  > require(['webpackNumbers'], function(webpackNumbers) {webpackNumbers.wordToNum('Five')})
+ 通过script引入
  > <script scr='http://unpkg.com/webpack-numbers'></script>(到时候主一下如何给window赋值全局变量的)

[完整的github代码](https://github.com/kalcifer/webpack-library-example)

#### 基本配置

目标：
+ 不打包lodash，应该使用`externals`来require用户加载好的lodash
+ 设置library名称是 webpack-numbers
+ 将library暴露为一个叫webpackNumbers的变量
+ 可以引用外部的library

使用：
+ es6的import引用
+ commonJS的require引用
+ script引用


