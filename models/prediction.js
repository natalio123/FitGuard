'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Prediction extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  Prediction.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      pregnancies: { allowNull: false, type: DataTypes.INTEGER },
      bloodGlucose: { allowNull: false, type: DataTypes.INTEGER },
      bloodPressure: { allowNull: false, type: DataTypes.INTEGER },
      insulin: { allowNull: false, type: DataTypes.INTEGER },
      bmi: { allowNull: false, type: DataTypes.FLOAT },
      age: { allowNull: false, type: DataTypes.INTEGER },
      outcome: { allowNull: false, type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'Prediction', tableName: 'predictions', timestamps: true, sequelize }
  )

  return Prediction
}
