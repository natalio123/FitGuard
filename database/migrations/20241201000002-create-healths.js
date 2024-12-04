'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('healths', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
        type: Sequelize.STRING
      },
      bloodGlucose: { allowNull: false, type: Sequelize.INTEGER },
      bloodPressureUp: { allowNull: false, type: Sequelize.INTEGER },
      bloodPressureDown: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('healths')
  }
}
