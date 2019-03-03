import _ from 'lodash'

function component() {

    var element = document.createElement('div')
    var btn = document.createElement('button')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    btn.innerHTML = 'Click me and check the console'
    element.appendChild(btn)
    
    btn.onclick = e => {
        console.log('btn click')

        // 按需加载引入一次就不会在进行加载了（可以查看network）
        import(/* webpackChunkName: 'print' */ './print').then(module => {
            const print = module.default // 一定要加.default
            print() 
        })
    }
    return element

}

document.body.appendChild(component())