const { Router } = require('express');
const controller = require('../controllers/sale.controller');

const routes = Router();

routes.get('/', controller.list);
routes.get('/listByUserId/:id', controller.saleByUserId);
routes.get('/listBySellerId/:id', controller.saleBySellerId);

routes.post('/save', controller.create);
routes.get('/list/:id', controller.list);
routes.put('/list/:id', controller.updateStatus);

module.exports = routes;
