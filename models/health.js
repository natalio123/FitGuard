'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Health extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Health.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      bloodGlucose: { allowNull: false, type: DataTypes.INTEGER },
      bloodPressureUp: { allowNull: false, type: DataTypes.INTEGER },
      bloodPressureDown: { allowNull: false, type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'Health', tableName: 'healths', timestamps: true, sequelize }
  )

  return Health
}
