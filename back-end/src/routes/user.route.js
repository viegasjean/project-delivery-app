const { Router } = require('express');
const controller = require('../controllers/user.controller');
const bodyValidator = require('../middlewares/bodyValidator.middleware');
const tokenValidator = require('../middlewares/tokenValidator.middleware');
const { loginSchema, registerSchema } = require('../schemas/user.schema');

const routes = Router();

routes.post('/login', bodyValidator(loginSchema), controller.login);
routes.post('/register', bodyValidator(registerSchema), controller.create);
routes.post('/adm/register',
  tokenValidator('administrator'),
  bodyValidator(registerSchema),
  controller.create);
routes.get('/list/:role', controller.list);

module.exports = routes;
