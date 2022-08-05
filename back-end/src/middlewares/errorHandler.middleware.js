const error = (err, _req, res, _next) => {
  console.log(err.message);
  if (err.status) return res.status(err.status).json({ message: err.message });

  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = error;