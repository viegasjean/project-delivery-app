const service = require('../services/product.service');

const list = async (_req, res, next) => {
  try {
    const response = await service.list();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
};