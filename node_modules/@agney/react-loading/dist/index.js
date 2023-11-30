
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-loading.cjs.production.min.js')
} else {
  module.exports = require('./react-loading.cjs.development.js')
}
