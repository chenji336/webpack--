// 默认会报错 `Unexpected token import`,需要babel-preset-env+babel-preset-stage-2
import 'lodash' 
// 默认没有export default，所以import webpackNum from 'chenji336-num'是false
import * as webpackNum from 'chenji336-num' 

console.log('webpackNum.numToWord(1):', webpackNum.numToWord(1))
console.log('webpackNum.wordToNum(two):', webpackNum.wordToNum('Two'))