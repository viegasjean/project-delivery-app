const jwt = require('jsonwebtoken');
require('dotenv').config();

class JWT {
  constructor() {
    this.jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    this.jwtSecret = '4H8r1@a8#GnX&avHKZd*';
  }

  generateToken(user) {
    const { jwtSecret, jwtConfig } = this;
    const token = jwt.sign({ data: user }, jwtSecret, jwtConfig);
    return token;
  }

  validateToken(token) {
    const { jwtSecret } = this;
    const result = jwt.decode(token, jwtSecret);
    return result;
  }
}

// const JWT = {
//   jwtConfig: {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   },
//   jwtSecret: process.env.JWT_SECRET,
//   validateToken(token) {
//     const { jwtSecret } = this;
//     const result = jwt.decode(token, jwtSecret);
//     return result;
//   },
//   generateToken(user) {
//     const { jwtSecret, jwtConfig } = this;
//     const token = jwt.sign({ data: user }, jwtSecret, jwtConfig);
//     return token;
//   },
// };

new JWT().generateToken('dksajldk');

module.exports = JWT;