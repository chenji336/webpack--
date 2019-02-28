function getComponent() {
   return import(/* webpackChunkName: 'lodash' */ 'lodash').then(_ => {
    var element = document.createElement('div')
    var btn = document.createElement('button')

    _ = _.default // import的引入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    btn.innerHTML = 'Click me and check the console'
   
    import(/* webpackChunkName: 'print' */ './print').then(print => {
        console.log('import print.js')
        var printMe = print.default;
        btn.onclick = printMe
    })
    console.log('appendChild')

    element.appendChild(btn)

    return element
   }).catch(error => 'An error occured while loading the component')
}

getComponent().then(ele => document.body.appendChild(ele))