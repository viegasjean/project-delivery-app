'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('sales', [{
    seller_id: 1,
    user_id: 1,
    total_price: 10.5,
    delivery_address: "fim do mundo",
    delivery_number: "4002-8922",
    sale_date: new Date(),
    status: "pending"
   }], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
