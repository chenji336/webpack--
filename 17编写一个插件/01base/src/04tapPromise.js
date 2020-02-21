class HelloPromisePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise('HelloPromisePlugin', compilation => {
      // 返回一个 Promise，在我们的异步任务完成时 resolve……
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          console.log('异步工作完成……');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = HelloPromisePlugin;