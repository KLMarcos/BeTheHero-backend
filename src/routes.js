const express = require('express');
const routes = express.Router();

const OngController = require('./controllers/ongController');
const IncidentController = require('./controllers/incidentController');

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.remove);

module.exports = routes;
