'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Physical extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Physical.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      step: { allowNull: false, type: DataTypes.INTEGER },
      calorie: { allowNull: false, type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'Physical', tableName: 'physicals', timestamps: true, sequelize }
  )

  return Physical
}
