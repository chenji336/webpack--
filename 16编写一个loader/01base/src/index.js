import example from './example.txt'

const fn = () => {
  console.log('arrow fn')
}
fn()
console.log('example:', example)

export const isNull = val => val === null

export const unique = arr => [...new Set(arr)]

console.log('unique:', unique([1,2,3,3]))
