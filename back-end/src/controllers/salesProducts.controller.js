const service = require('../services/salesProducts.service');

const create = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};