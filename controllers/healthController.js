const crypto = require('crypto')
const Validator = require('fastest-validator')

const { Op } = require('sequelize')

const { createError } = require('../middlewares/errorHandler')
const { Health, User } = require('../models')

const v = new Validator()

const createHealth = async (req, res, next) => {
  try {
    const schema = {
      bloodGlucose: 'number|empty:false',
      bloodPressureUp: 'number|empty:false',
      bloodPressureDown: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const userId = req.user.id

    const { bloodGlucose, bloodPressureUp, bloodPressureDown } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const now = new Date()
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
    const endOfWeek = new Date(startOfWeek)

    endOfWeek.setDate(endOfWeek.getDate() + 6)

    const health = await Health.findOne({
      where: { userId: userId, createdAt: { [Op.between]: [startOfWeek, endOfWeek] } }
    })

    if (health) throw createError(409, 'user health already created for this week')

    await Health.create({ id, userId, bloodGlucose, bloodPressureUp, bloodPressureDown })

    return res.status(201).json({ status: 'success', message: 'user health created successfully' })
  } catch (err) {
    next(err)
  }
}

const deleteHealth = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const health = await Health.findByPk(id)

    if (!health) throw createError(404, 'user health not found')

    await health.destroy()

    return res.json({ status: 'success', message: 'user health deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const getAllHealth = async (req, res, next) => {
  try {
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const health = await Health.findAll({ where: { userId } })

    return res.json({ status: 'success', data: health })
  } catch (err) {
    next(err)
  }
}

const getHealth = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const health = await Health.findByPk(id)

    if (!health) throw createError(404, 'user health not found')

    return res.json({ status: 'success', data: health })
  } catch (err) {
    next(err)
  }
}

const updateHealth = async (req, res, next) => {
  try {
    const schema = {
      bloodGlucose: 'number|empty:false',
      bloodPressureUp: 'number|empty:false',
      bloodPressureDown: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = req.params.id
    const userId = req.user.id

    const { bloodGlucose, bloodPressureUp, bloodPressureDown } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const health = await Health.findByPk(id)

    if (!health) throw createError(404, 'user health not found')

    await health.update({ bloodGlucose, bloodPressureUp, bloodPressureDown })

    return res.json({
      status: 'success',
      data: { id, userId, bloodGlucose, bloodPressureUp, bloodPressureDown }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { createHealth, deleteHealth, getAllHealth, getHealth, updateHealth }
