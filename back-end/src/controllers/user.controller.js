const service = require('../services/user.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await service.login({ email, password });
    console.log(req.body);
    return res.status(200).json({ ...response });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    await service.create({ email, password, name, role });

<<<<<<< HEAD
    return res.status(201).json({ message: 'User created successfully' });
=======
    return res.status(201).json({ ...response });
>>>>>>> 058cacd (:sparkles: Feat: login page)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  create,
};
