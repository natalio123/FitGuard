'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Health, { foreignKey: 'userId' })
      this.hasMany(models.Medication, { foreignKey: 'userId' })
      this.hasMany(models.MedicationDetail, { foreignKey: 'userId' })
      this.hasMany(models.Nutrition, { foreignKey: 'userId' })
      this.hasMany(models.Physical, { foreignKey: 'userId' })
      this.hasMany(models.Prediction, { foreignKey: 'userId' })
      this.hasMany(models.Water, { foreignKey: 'userId' })
    }
  }

  User.init(
    {
      id: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
      avatar: { allowNull: false, type: DataTypes.STRING },
      name: { allowNull: false, type: DataTypes.STRING },
      email: { allowNull: false, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING },
      createdAt: { allowNull: false, type: DataTypes.DATE },
      updatedAt: { allowNull: false, type: DataTypes.DATE }
    },
    { modelName: 'User', tableName: 'users', timestamps: true, sequelize }
  )

  return User
}
