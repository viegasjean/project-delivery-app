module.exports = (sequelize, DataTypes) => {
const salesProducts = sequelize.define('salesProducts', {
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
    underscored: true,
    timestamps: false,
  });

  salesProducts.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: salesProducts,
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.product.belongsToMany(models.sale, {
      through: salesProducts,
      as: 'sales',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });

  }
  return salesProducts;
};