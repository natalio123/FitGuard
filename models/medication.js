'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' })

      this.hasMany(models.MedicationDetail, { foreignKey: 'medicationId', as: 'detail' })
    }
  }

  Medication.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      name: { allowNull: false, type: DataTypes.STRING },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'Medication', tableName: 'medications', timestamps: true, sequelize }
  )

  return Medication
}
