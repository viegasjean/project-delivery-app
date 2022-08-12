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
      id: dbUser.id,
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
    role: data.role,
    password: encryptedPassword,
  });

  const token = new JWT().generateToken({ name: data.name, email: data.email, role: data.role });
  return {
    name: data.name,
    email: data.email,
    role: data.role,
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

module.exports = { login, create, list };
