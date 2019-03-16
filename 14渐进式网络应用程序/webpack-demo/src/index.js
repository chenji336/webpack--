import _ from 'lodash'
import printMe from './print'

function component() {
    var element = document.createElement('div')
    var btn = document.createElement('button')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    btn.innerHTML = 'Click me and check the console1'
    btn.onclick = printMe

    element.appendChild(btn)

    return element
}

document.body.appendChild(component())

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered:', registration)
        }).catch(registrationError => {
            console.error('SW registration failed:', registrationError)
        })
    })
}
