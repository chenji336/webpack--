import _ from 'lodash'
import printMe from './print'
import './style.css'

function component() {
    var element = document.createElement('div')
    var btn = document.createElement('button')

    element.innerHTML = _.join(['Hello2', 'webpack'], ' ')

    btn.innerHTML = 'Click me and check the console'
    btn.onclick = printMe

    element.appendChild(btn)

    return element
}

let element = component()
document.body.appendChild(element)

if (module.hot) {
    console.log('hello module.hot')
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!')
        printMe()
        document.body.removeChild(element)
        element = component() // 页面重新渲染就会绑定新的事件
        document.body.appendChild(element)
    })
}