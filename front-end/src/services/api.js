const axios = require('axios');

const url = 'http://localhost:3001';

const login = async (user) => {
  try {
    const { status, data } = await axios.post(`${url}/user/login`, user);
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

// login({email: "bola8@gmail.com", password: "senhaBonita"})

const register = async (user) => {
  try {
    const { status, data } = await axios.post(`${url}/user/register`, user);
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

module.exports = {
  login,
  register,
};
