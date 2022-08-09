const yup = require('yup');

const minPassword = 6;
// const fullName = 12;

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(minPassword).required(),
});

// const registerSchema = yup.object().shape({
//   name: yup.string().min(fullName).required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(password).required(),
// });

module.exports = {
  loginSchema,
};
