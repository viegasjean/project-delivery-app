const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const error = require('../middlewares/errorHandler.middleware');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(error);

module.exports = app;
