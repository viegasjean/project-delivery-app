const md5 = require('md5');
const { user: model } = require('../database/models');
const ErrorHandler = require('../utils/errorHandler.class');
const JWT = require('../utils/jwtHandler');

const login = async ({ email, password }) => {
  const dbUser = await model.findOne({ where: { email } });
  
  if (!dbUser) throw new ErrorHandler(400, 'User email or password is incorrect');
  const passwordHash = md5(password);

  if (passwordHash !== dbUser.password) {
    throw new ErrorHandler(400, 'User email or password is incorrect');
  }

  const token = new JWT().generateToken({ name: dbUser.name, email, role: dbUser.role });

  return token;
};

const create = async (data) => {
  const userExists = await model.findOne({ where: { email: data.email } });

  if (userExists) throw new ErrorHandler(409, 'User already exists');

  const encryptedPassword = md5(data.password);
  await model.create({
    ...data,
    password: encryptedPassword,
  });
};

// login({
//   email: 'brenosantos145@gmail.com',
//   password: 'senha',
// });

// create({
//   name: 'Teste',
//   email: 'teste@teste.com',
//   password: 'senhaDeTeste',
//   role: 'customer',
// });

module.exports = { login, create };