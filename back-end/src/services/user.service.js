const md5 = require('md5');
const { user: model } = require('../database/models');
const ErrorHandler = require('../utils/errorHandler.class');
const JWT = require('../utils/jwtHandler');

const login = async ({ email, password }) => {
  const dbUser = await model.findOne({ where: { email } });

  if (!dbUser) throw new ErrorHandler(404, 'User email or password is incorrect');
  const passwordHash = md5(password);

  if (passwordHash !== dbUser.password) {
    throw new ErrorHandler(400, 'User email or password is incorrect');
  }

  const token = new JWT().generateToken({ name: dbUser.name, email, role: dbUser.role });

  return {
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      token,
  };
};

const create = async (data) => {
  const userExists = await model.findOne({ where: { email: data.email } });

  if (userExists) throw new ErrorHandler(409, 'User already exists');

  const encryptedPassword = md5(data.password);
  await model.create({
    ...data,
    role: 'customer',
    password: encryptedPassword,
  });

  const token = new JWT().generateToken({ name: data.name, email: data.email, role: 'customer' });
  return {
    name: data.name,
    email: data.email,
    role: 'customer',
    token,
};
};

const list = async (role) => {
  if (role === 'all') {
    const users = model.findAll();
    return users;
  }
    const users = model.findAll({ where: { role } });
    return users;
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

module.exports = { login, create, list };
