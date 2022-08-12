const { sale: model, product } = require('../database/models');

const create = async (sale) => {
  const created = await model.create(sale);
  return created;
};

const list = async () => {
  const created = await model.findAll(
     { include: [{ model: product, as: 'products', through: { attributes: [] } }] },
    );
  return created;
};

module.exports = {
  create,
  list,
};