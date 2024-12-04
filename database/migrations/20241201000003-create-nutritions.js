'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutritions', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
        type: Sequelize.STRING
      },
      water: { allowNull: false, type: Sequelize.INTEGER },
      breakFast: { allowNull: false, type: Sequelize.INTEGER },
      lunch: { allowNull: false, type: Sequelize.INTEGER },
      dinner: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nutritions')
  }
}
