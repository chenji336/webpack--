// 一个具名 JavaScript 函数。
class HelloWorldPlugin {
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {
    console.log('plugin')
    // 指定要附加到的事件钩子函数（emit/done...)
    compiler.hooks.done.tap('Hello World Plugin',(
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
    ) => {
      // console.log('stas:', stats)
      console.log('Hello World! I am plugin!')
    })
  }
}

module.exports = HelloWorldPlugin;