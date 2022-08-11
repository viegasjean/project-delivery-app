'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('sales_products', [{
      sale_id: 1,
      product_id: 1,
      quantity: 100
    }], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};
