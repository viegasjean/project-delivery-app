const { Router } = require('express');
const user = require('./user.route');
const product = require('./product.route');
const sale = require('./sale.route');

const routes = Router();

routes.use('/user', user);
routes.use('/product', product);
routes.use('/sale', sale);

module.exports = routes;