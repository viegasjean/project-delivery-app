const service = require('../services/sale.service');

const create = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};