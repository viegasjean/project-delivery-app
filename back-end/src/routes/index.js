const { Router } = require('express');
const user = require('./user.route');
const product = require('./product.route');
const sale = require('./sale.route');
const salesProducts = require('./salesProducts.route');

const routes = Router();

routes.use('/user', user);
routes.use('/product', product);
routes.use('/sale', sale);
routes.use('/salesproducts', salesProducts);

module.exports = routes;