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

const getProducts = async () => {
  try {
    const { status, data } = await axios.get(`${url}/product/list`);
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

const getUsers = async (role) => {
  try {
    const { status, data } = await axios.get(`${url}/user/list/${role}`);
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

const saveSale = async (sale, token) => {
  try {
    const { status, data } = await axios
      .post(`${url}/sale/save`, sale, { headers: { authorization: token } });
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

const saveSalesProducts = async (salesProducts, token) => {
  try {
    const { status, data } = await axios
      .post(
        `${url}/salesproducts/save`,
        salesProducts,
        { headers: { authorization: token } },
      );
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

module.exports = {
  login,
  register,
  getProducts,
  getUsers,
  saveSale,
  saveSalesProducts,
};
