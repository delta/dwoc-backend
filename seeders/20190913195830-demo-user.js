'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
        firstName: 'test',
	lastName: 'user',
	email: 'test@delta.nitt.edu',
	password: '$2y$12$gaiYXI1BJlws88ZqGcOdFO44NckUAVntsImFe9B36b5sZ8uQrVi.u',
	createdAt: new Date(),
	updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('users',null,{});
  }
};
