const { sale: model } = require('../database/models');

const create = async (sale) => {
  const created = await model.create(sale);
  return created;
};

const list = async () => {
  const sales = await model.findAll();
  return sales;
};

const salesByUserId = async (userId) => {
  const found = await model.findAll({ where: { userId } });
  return found;
};

module.exports = {
  create,
  list,
  salesByUserId,
};