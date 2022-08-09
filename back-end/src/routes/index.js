const { Router } = require('express');
const user = require('./user.route');
const product = require('./product.route');

const routes = Router();

routes.use('/user', user);
routes.use('/product', product);

module.exports = routes;