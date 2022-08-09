const { product } = require('../database/models');

const list = async () => {
  const products = await product.findAll();

  return products;
};

module.exports = {
  list,
};