
module.exports = (sequelize, DataTypes) => {
const salesProduct = sequelize.define('salesProduct', {
    sale_id: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    quantity: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'salesProduct',
    timestamps: false,
  });

  salesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: salesProduct,
      as: 'sales',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.product.belongsToMany(models.sale, {
      through: salesProduct,
      as: 'products',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });

  }
  return salesProduct;
};