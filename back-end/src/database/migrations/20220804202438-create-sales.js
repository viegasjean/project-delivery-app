'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "users"
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "users"
        }
      },
      total_price: {
        type: Sequelize.DECIMAL(9,2)
      },
      delivery_address: {
        type: Sequelize.STRING(100)
      },
      delivery_number: {
        type: Sequelize.STRING(50)
      },
      sale_date: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      status: {
        type: Sequelize.STRING(50)
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};