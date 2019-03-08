function component() {
    var element = document.createElement('div')

    // Lodash 是全局引入的
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.innerHTML = join(['Hello', 'webpack'], ' ')

    return element
}

document.body.appendChild(component())