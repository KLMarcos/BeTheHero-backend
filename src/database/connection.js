const knex = require('knex')
const configuration = require('./../../knexfile')

console.log('Teste')
const config =
  process.env.NODE_ENV === 'dev' ? configuration.dev : configuration.production

const connection = knex(config)

module.exports = connection
