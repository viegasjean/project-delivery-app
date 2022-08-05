const { Router } = require('express');
const controller = require('../controllers/user.controller');
const bodyValidator = require('../middlewares/bodyValidator.middleware');
const { loginSchema } = require('../schemas/user.schema');

const routes = Router();

routes.post('/login', bodyValidator(loginSchema), controller.login);

module.exports = routes;