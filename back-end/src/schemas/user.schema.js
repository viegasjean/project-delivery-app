const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  name: joi.string().min(3).required(),
  role: joi.string().valid('customer', 'administrator', 'seller'),
});

module.exports = {
  loginSchema,
  registerSchema,
};
