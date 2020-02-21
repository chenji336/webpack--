// 一个具名 JavaScript 函数。
class HelloCompilationPlugin {
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {
    // 指定要附加到的事件钩子函数（emit/done/compilation...)
    // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
    compiler.hooks.compilation.tap('HelloCompilationPlugin',(
      compilation
    ) => {
      // 现在，通过 compilation 对象，我们可以 tap(触及) 到各种可用的 hooks 了
      compilation.hooks.optimize.tap('HelloCompilationPlugin',() => {
        console.log('正在优化资源.')
      })
    })
  }
}

module.exports = HelloCompilationPlugin;