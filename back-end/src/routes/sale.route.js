const { Router } = require('express');
const controller = require('../controllers/sale.controller');

const routes = Router();

routes.get('/', controller.list);
routes.get('/:id', controller.saleByUserId);

routes.post('/save', controller.create);

module.exports = routes;
