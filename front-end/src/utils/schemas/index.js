const yup = require('yup');

const minPassword = 6;
const fullName = 12;

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(minPassword).required(),
});

const registerSchema = yup.object().shape({
  name: yup.string().min(fullName).required(),
  email: yup.string().email().required(),
  password: yup.string().min(minPassword).required(),
});

const adminRegisterSchema = yup.object().shape({
  name: yup.string().min(fullName).required(),
  email: yup.string().email().required(),
  password: yup.string().min(minPassword).required(),
  role: yup.string().matches(/(administrator|customer|seller)/),
});
module.exports = {
  loginSchema,
  registerSchema,
  adminRegisterSchema,
};
