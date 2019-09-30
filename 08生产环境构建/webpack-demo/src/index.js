import { cube, square } from './math'
import './style.css'

console.log('process.env.test:', process.env.test)
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!')
}

function component() {
    var element = document.createElement('pre')

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n')

    return element
}

document.body.appendChild(component())