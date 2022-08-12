const { sale: model, product } = require('../database/models');

const create = async (sale) => {
  const created = await model.create(sale);
  return created;
};

const list = async (id) => {
  const created = await model.findAll(
      { 
        where: { id },
        include: { 
          model: product,
          as: 'products',
          through: {
            attributes: ['quantity'], 
          }, 
        }, 
      },
    );
  return created;
};

module.exports = {
  create,
  list,
};