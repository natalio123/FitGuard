'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Nutrition extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Nutrition.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      water: { allowNull: false, type: DataTypes.INTEGER },
      breakFast: { allowNull: false, type: DataTypes.INTEGER },
      lunch: { allowNull: false, type: DataTypes.INTEGER },
      dinner: { allowNull: false, type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'Nutrition', tableName: 'nutritions', timestamps: true, sequelize }
  )

  return Nutrition
}
