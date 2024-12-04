'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class MedicationDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Medication, { foreignKey: 'medicationId' })
      this.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }

  MedicationDetail.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      userId: { allowNull: false, type: DataTypes.STRING },
      medicationId: { allowNull: false, type: DataTypes.STRING },
      type: { allowNull: false, type: DataTypes.STRING },
      time: { allowNull: false, type: DataTypes.TIME },
      quantity: { allowNull: false, type: DataTypes.INTEGER },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'MedicationDetail', tableName: 'medication_details', timestamps: true, sequelize }
  )

  return MedicationDetail
}
