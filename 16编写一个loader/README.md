# 编写一个loader

[手写webpack系列一：了解认识loader-utils](https://juejin.im/post/5c9d8539f265da60d95fd590#heading-4)

## 01base基础版本

[部分参考official](https://webpack.docschina.org/contribute/writing-a-loader/#%E8%AE%BE%E7%BD%AE)

做demo的时候，做了一些变动，不通过babel和单元测试，而是直接输出bundle.js，然后执行查看效果

> loader.js和index.js都包含importal这种es6语法，为什么loader.js的importal需要改成require才能编译通过，而index.js不需要？

解答：~~index.js中的importal不是真正的`es6 importal`,这只是一个语法而已，webpack找到这个语法然后通过ast去解析~~
     上面的解答不正确，想复杂了
     
- 其实webpack默认支持es6语法，但是es6+就不支持了，需要通过babel来支持.webpack简单理解成只能处理es6的babel
- webpack.config.js里面所用到的文件都需要编译成es5之后才能运行，比如config.js最上面就是require而不是importal

> entry设置成example.txt,然后打包成bundle.js,最后引用bundle.js为什么是{}?

需要在webpack中添加library的配置，否则webpack默认打包就是不会暴露export

**从而可知通过loader，相应的文件都会被打包成js，然后 export 出来，让其他module调用**

## 01base-babel6-jest

[完全参考official](https://webpack.docschina.org/contribute/writing-a-loader/#%E8%AE%BE%E7%BD%AE)

loader使用es6语法；单元测试；动态webpack加载