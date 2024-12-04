'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('waters', {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' },
        type: Sequelize.STRING
      },
      time: { allowNull: false, type: Sequelize.TIME },
      quantity: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('waters')
  }
}
