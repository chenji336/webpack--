class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('HelloAsyncPlugin', (compilation, callback) => {
      // 做一些异步的事情……
      setTimeout(function() {
        console.log('Done with async work...');
        callback();
      }, 1000);
    });
  }
}

module.exports = HelloAsyncPlugin;