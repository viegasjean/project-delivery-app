const { sale: model, product, user } = require('../database/models');

const create = async (sale) => {
  const created = await model.create(sale);
  return created;
};

const list = async (id) => {
  const created = await model.findAll(
      { 
        where: { id },
        include: [
          { 
            model: product,
            as: 'products',
            through: { attributes: ['quantity'] }, 
          },
          {
            model: user,
            as: 'seller',
            attributes: { exclude: ['id', 'password', 'email', 'role'] },
          },
        ], 
      },
    );
  return created;
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
