const express = require('express')
const routes = express.Router()

const OngController = require('./controllers/ongController')
const IncidentController = require('./controllers/incidentController')
const ProfileController = require('./controllers/profileController')
const SessionController = require('./controllers/sessionController')

routes.post('/ongs', OngController.create)
routes.get('/ongs', OngController.index)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.remove)

routes.get('/profile', ProfileController.index)

routes.post('/sessions', SessionController.create)

module.exports = routes
