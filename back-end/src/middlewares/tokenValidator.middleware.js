const JwtHandler = require('../utils/jwtHandler');
const ErrorHandler = require('../utils/errorHandler.class');

const tokenValidator = (role) => (req, _res, next) => {
  const { authorization } = req.headers;
  const jwt = new JwtHandler();
  const isTokenValid = jwt.validateToken(authorization);
  if (!isTokenValid) throw new ErrorHandler(401, 'Token must be a valid token');
  if (role !== isTokenValid.data.role) {
    throw new ErrorHandler(401, 'Token must be a valid token');
  }
  next();
};

module.exports = tokenValidator;
