const md5 = require('md5');
const { user } = require('../database/models');
const ErrorHandler = require('../utils/errorHandler.class');
const JWT = require('../utils/jwtHandler');

const login = async ({ email, password }) => {
  const dbUser = await user.findOne({ where: { email } });
  
  if (!dbUser) throw new ErrorHandler(400, 'User email or password is incorrect');
  const passwordHash = md5(password);

  if (passwordHash !== dbUser.password) {
    throw new ErrorHandler(400, 'User email or password is incorrect');
  }

  const token = new JWT().generateToken({ name: dbUser.name, email, role: dbUser.role });

  return token;
};

// login({
//   email: 'brenosantos145@gmail.com',
//   password: 'senha',
// });

module.exports = { login };