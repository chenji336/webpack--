import _ from 'lodash'
import numRef from './ref.json'

export function numToWord(num) {
    // 就算找到也会一循环完的，就跟forEach一样不会返回正确就中断的
    // accum 累加器
    return _.reduce(numRef, (accum, ref) => ref.num === num ? ref.word : accum, '')
}

export function wordToNum(word) {
    return _.reduce(numRef, (accum, ref) => ref.word === word && word.toLowerCase() ? ref.num : accum, -1)
}
