const { Router } = require('express');
const controller = require('../controllers/salesProducts.controller');

const routes = Router();

routes.post('/save', controller.create);

module.exports = routes;
