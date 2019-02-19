import _ from 'lodash'
import './style.css'
import Icon from './icon.png' // 默认除了js，其他都要加后缀，除非配置了
import JSONDATA from './data.json'
import XMLDATA from './data.xml'

function component() {
    var element = document.createElement('div')

    // Lodash(目前是通过一个 script 脚步引入)对于执行这一行是必须的
    // Lodash 现在通过import引入进来
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('hello')

    // 将图片添加到现有的div
    var myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)

    console.log('JSONDATA:', JSONDATA)
    console.log('XMLDATA:', XMLDATA)

    return element
}

document.body.appendChild(component())