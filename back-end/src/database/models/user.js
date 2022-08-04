module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  });

  
  user.associate = (models) => {
    user.hasMany(models.sale, {
      as: 'sale',
      foreignKey: 'user_id',
      otherKey: 'id',
    })
  }

  return user;
};

