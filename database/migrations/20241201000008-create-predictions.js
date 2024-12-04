'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('predictions', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      userId: { allowNull: false, type: Sequelize.STRING },
      pregnancies: { allowNull: false, type: Sequelize.INTEGER },
      bloodGlucose: { allowNull: false, type: Sequelize.INTEGER },
      bloodPressure: { allowNull: false, type: Sequelize.INTEGER },
      skinThickness: { allowNull: false, type: Sequelize.INTEGER },
      insulin: { allowNull: false, type: Sequelize.INTEGER },
      bmi: { allowNull: false, type: Sequelize.FLOAT },
      diabetesPedigreeFunction: { allowNull: false, type: Sequelize.FLOAT },
      age: { allowNull: false, type: Sequelize.INTEGER },
      outcome: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('predictions')
  }
}
