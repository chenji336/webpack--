async function getComponent() {

    let  _ = await import(/* webpackChunkName: 'lodash' */ 'lodash')
    var element = document.createElement('div')
    var btn = document.createElement('button')

    _ = _.default // 这里._default不一定要加，因为join方法lodash自己也抛出来了
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    btn.innerHTML = 'Click me and check the console'

    const print = await import(/* webpackChunkName: 'print' */ './print')
    const printMe = print.default // 一定要加.default
    btn.onclick = printMe
    element.appendChild(btn)

    return element

}

getComponent().then(ele => document.body.appendChild(ele))