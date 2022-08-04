const express = require('express');
// const { sale, user, salesProduct } = require('../database/models');

const app = express();

app.use(express.json());

// app.get('/teste', async (_req, res) => {
//   const data = await salesProduct.findAll();
//   return res.status(200).json({ data });
// });

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
