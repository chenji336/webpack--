# 学习webpack指南中的demo，进行比较学习

## 各个目录知识点

#### 安装
webpack4.x npm i -D webpack webpack-cli(不需要漏了webpack-cli))

#### 起步

##### 基本安装
通过script引入`lodash`，这样会产生一些问题：
+ 脚本执行依赖外部的扩展库
+ 依赖不存在，或则引入顺序错误，会报错
+ 依赖被引入但是没有使用，浏览器还是会下载