const { Router } = require('express');
const controller = require('../controllers/product.controller');

const routes = Router();

routes.get('/list', controller.list);

module.exports = routes;
