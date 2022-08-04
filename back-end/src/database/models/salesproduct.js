'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesProduct extends Model {
  }
  salesProduct.init({
    saleId: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    productId: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    quantity: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'salesProduct',
    timestamps: false,
    underscored: true
  });
  return salesProduct;
};