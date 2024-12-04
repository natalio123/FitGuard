'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Water extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Water.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      time: { allowNull: false, type: DataTypes.TIME },
      quantity: { allowNull: false, type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'Water', tableName: 'waters', timestamps: true, sequelize }
  )

  return Water
}
