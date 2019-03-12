import { file, parse } from './global.js'

console.log('file:', file)
console.log('parse:', parse())

function component() {
    var element = document.createElement('div')

    // Lodash 是全局引入的
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.innerHTML = join(['Hello', 'webpack'], ' ')

    // 假设处于 `window` 上下文
    // this.alert('Hmmm, this proboly isn\'t a idea!')
    window.alert('Hmmm, this proboly isn\'t a idea!')

    return element
}

document.body.appendChild(component())

// 如果要在ie9中使用，需要使用babel转换箭头函数（我这边就直接使用function）
// 就算使用了whatwg-fetch，但是ie9中还是有跨域问题，所以建议使用axios
// 可以发现动态的加载了polyfill.bundle.js
fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {return response.json()})
    .then(function(json) { 
        console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
        console.log(json)
    })
    .catch(function(error) { console.error('Something went wrong when fetching this data: ', error)})