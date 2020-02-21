# 编写一个插件

[webpack official](https://webpack.docschina.org/contribute/writing-a-plugin/)

## 01base

基本的插件结构

执行npx webpack,可以看到控制台打出相应的log

## qiniu-loader

雨辰写的七牛上传插件

- 如何plugin修改 webpack publicPath ？ compilation.outputOptions.publicPath
- loader.js有什么作用？我只看到改了图片路径 
  - 是的，就是修改文件的路径而已。因为mode=pic 不会修改publicPath,所以需要修改文件路径
  - 可以参考file-loader,如果文件超过limitSize，最后出来的也是一个路径而已
  - 小总结：loader.js作用就是file-loader之后修改成可以访问七牛的路径

## 需要咨询的问题

为什么考虑到只上传图片这个操作？