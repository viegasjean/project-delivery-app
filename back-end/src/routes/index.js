const { Router } = require('express');
const user = require('./user.route');

const routes = Router();

routes.use('/user', user);

module.exports = routes;