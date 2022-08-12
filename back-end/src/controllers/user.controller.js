const service = require('../services/user.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await service.login({ email, password });
    return res.status(200).json({ ...response });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, password, name, role = 'customer' } = req.body;
    const response = await service.create({ email, password, name, role });

    return res.status(201).json({ ...response });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const { role } = req.params;
    const users = await service.list(role);

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  create,
  list,
};
