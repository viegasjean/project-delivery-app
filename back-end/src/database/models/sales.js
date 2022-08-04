module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sale', {
    sellerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sales',
    timestamps: false,
    underscored: true
  });

  sales.associate = (models) => {
    sales.belongsTo(models.user, {
      as: 'seller',
      foreignKey: 'seller_id',
      otherKey: 'id',
    })
    sales.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'user_id',
      otherKey: 'id',
    })
  }

  return sales;
};
