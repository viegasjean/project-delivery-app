'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        name: 'Breno Santos',
        email: 'brenosantos145@gmail.com',
        password: '59e91960ac8f5a65c501bdbf7cbbcb63',
        role: 'administrator'
      },
      {
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator'
     }
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
