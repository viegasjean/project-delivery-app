'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [{
      sale_id: 1,
      product_id: 1,
      quantity: 100
    }], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {});
  }
};
