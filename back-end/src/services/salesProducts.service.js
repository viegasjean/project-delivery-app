const { salesProducts: model } = require('../database/models');

const create = async (products) => {
  const created = await model.bulkCreate(products);
  console.log('created', created);
  return created;
};

// const list = async () => {
//   const created = await sale.findAll(
//      { include: [{model: product, as: 'sales', through: { attributes: [] } }],}
//     );
//   return created;
// };

module.exports = {
  create,
  // list
};