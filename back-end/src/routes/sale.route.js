const { Router } = require('express');
const controller = require('../controllers/sale.controller');

const routes = Router();

routes.post('/save', controller.create);
routes.get('/list/:id', controller.list);

module.exports = routes;
