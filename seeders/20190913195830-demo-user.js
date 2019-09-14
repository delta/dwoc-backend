
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [{
    firstName: 'test',
    lastName: 'user',
    email: 'test@delta.nitt.edu',
    password: '$2y$12$gaiYXI1BJlws88ZqGcOdFO44NckUAVntsImFe9B36b5sZ8uQrVi.u',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
  ,
};
