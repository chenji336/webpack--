function component() {
    var element = document.createElement('div')

    // Lodash 是全局引入的
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.innerHTML = join(['Hello', 'webpack'], ' ')

    // 假设处于 `window` 上下文
    this.alert('Hmmm, this proboly isn\'t a idea!')

    return element
}

document.body.appendChild(component())