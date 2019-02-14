function component() {
    var element = document.createElement('div')

    // Lodash(目前是通过一个 script 脚步引入)对于执行这一行是必须的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    return element
}

document.body.appendChild(component())