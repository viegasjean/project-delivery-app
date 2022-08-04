'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'product',
    timestamps: false,
    underscored: true
  });
  return product;
};