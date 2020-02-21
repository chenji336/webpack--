// import { getOptions } from 'loader-utils'
// export default function loader(source) {
// }

const getOptions = require('loader-utils').getOptions;
// module.exports.default = function (source) { // 跟下面等价
module.exports = function (source) {
  console.log('loader.js')
  const options = getOptions(this)
  source = source.replace(/\[name\]/g, options.name)
  return `export default ${ JSON.stringify(source) }`
}