require('dotenv').config({
  path: require('path').join(__dirname, '../.env'),
})

const express = require('express')
const routes = require('./routes/routes')
const cors = require('cors')
const { errors } = require('celebrate')
const yaml = require('yamljs')
const swaggerUi = require('swagger-ui-express')

const app = express()
const swaggerDocument = yaml.load('src/swagger.yaml')

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.redirect('/api-docs')
})

app.use(routes)
app.use(errors())

module.exports = app
