import { cube, square } from './math'

/** 
 * 可以把注释掉查看main.js的大小
 */
// import 'babel-polyfill' // 默认没有sideEffects:false

// import map from 'lodash/map';
// import { isArray } from 'lodash'
// import _from 'lodash'

// import { isArray } from 'lodash-es'
// import _ from 'lodash-es'

function component() {
    var element = document.createElement('pre')

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n')

    return element
}

document.body.appendChild(component())