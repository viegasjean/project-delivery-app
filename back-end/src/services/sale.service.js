const { sale: model } = require('../database/models');


const create = async (sale) => {
  const created = await model.create(sale)
  return created
};

module.exports = {
  create
}