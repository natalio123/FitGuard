const crypto = require('crypto')
const Validator = require('fastest-validator')

const { Op } = require('sequelize')

const { createError } = require('../middlewares/errorHandler')
const { Nutrition, User } = require('../models')

const v = new Validator()

const createNutrition = async (req, res, next) => {
  try {
    const schema = {
      water: 'number|empty:false',
      breakFast: 'number|empty:false',
      lunch: 'number|empty:false',
      dinner: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const userId = req.user.id

    const { water, breakFast, lunch, dinner } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const startOfDay = new Date()

    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()

    endOfDay.setHours(23, 59, 59, 999)

    const nutrition = await Nutrition.findOne({
      where: { userId: userId, createdAt: { [Op.between]: [startOfDay, endOfDay] } }
    })

    if (nutrition) throw createError(409, 'user nutrition already created for this day')

    await Nutrition.create({ id, userId, water, breakFast, lunch, dinner })

    return res
      .status(201)
      .json({ status: 'success', message: 'user nutrition created successfully' })
  } catch (err) {
    next(err)
  }
}

const deleteNutrition = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const nutrition = await Nutrition.findByPk(id)

    if (!nutrition) throw createError(404, 'user nutrition not found')

    await nutrition.destroy()

    return res.json({ status: 'success', message: 'user nutrition deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const getAllNutrition = async (req, res, next) => {
  try {
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const nutrition = await Nutrition.findAll({ where: { userId } })

    return res.json({ status: 'success', data: nutrition })
  } catch (err) {
    next(err)
  }
}

const getNutrition = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const nutrition = await Nutrition.findByPk(id)

    if (!nutrition) throw createError(404, 'user nutrition not found')

    return res.json({ status: 'success', data: nutrition })
  } catch (err) {
    next(err)
  }
}

const updateNutrition = async (req, res, next) => {
  try {
    const schema = {
      water: 'number|empty:false',
      breakFast: 'number|empty:false',
      lunch: 'number|empty:false',
      dinner: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = req.params.id
    const userId = req.user.id

    const { water, breakFast, lunch, dinner } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const nutrition = await Nutrition.findByPk(id)

    if (!nutrition) throw createError(404, 'user nutrition not found')

    await nutrition.update({ water, breakFast, lunch, dinner })

    return res.json({ status: 'success', data: { id, userId, water, breakFast, lunch, dinner } })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createNutrition,
  deleteNutrition,
  getAllNutrition,
  getNutrition,
  updateNutrition
}
