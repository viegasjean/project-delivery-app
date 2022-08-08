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
    const { email, password, name, role } = req.body;
    await service.create({ email, password, name, role });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  create,
};
