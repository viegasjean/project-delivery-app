
module.exports = (sequelize, DataTypes) => {
const salesProduct = sequelize.define('salesProducts', {
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
    modelName: 'salesProducts',
    timestamps: false,
  });

  salesProducts.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: salesProducts,
      as: 'sales',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.product.belongsToMany(models.sale, {
      through: salesProducts,
      as: 'products',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });

  }
  return salesProducts;
};