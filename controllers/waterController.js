const crypto = require('crypto')
const Validator = require('fastest-validator')

const { Op } = require('sequelize')

const { createError } = require('../middlewares/errorHandler')
const { User, Water } = require('../models')

const v = new Validator()

const createWater = async (req, res, next) => {
  try {
    const schema = { time: 'string|empty:false', quantity: 'number|empty:false' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const userId = req.user.id

    const { time, quantity } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const startOfDay = new Date()

    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()

    endOfDay.setHours(23, 59, 59, 999)

    const water = await Water.findOne({
      where: { userId: userId, createdAt: { [Op.between]: [startOfDay, endOfDay] } }
    })

    if (water) throw createError(409, 'user water already created for this day')

    await Water.create({ id, userId, time, quantity })

    return res.status(201).json({ status: 'success', message: 'user water created successfully' })
  } catch (err) {
    next(err)
  }
}

const deleteWater = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const water = await Water.findByPk(id)

    if (!water) throw createError(404, 'user water not found')

    await water.destroy()

    return res.json({ status: 'success', message: 'user water deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const getAllWater = async (req, res, next) => {
  try {
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const water = await Water.findAll({ where: { userId } })

    return res.json({ status: 'success', data: water })
  } catch (err) {
    next(err)
  }
}

const getWater = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const water = await Water.findByPk(id)

    if (!water) throw createError(404, 'user water not found')

    return res.json({ status: 'success', data: water })
  } catch (err) {
    next(err)
  }
}

const updateWater = async (req, res, next) => {
  try {
    const schema = { time: 'string|empty:false', quantity: 'number|empty:false' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = req.params.id
    const userId = req.user.id

    const { time, quantity } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const water = await Water.findByPk(id)

    if (!water) throw createError(404, 'user water not found')

    await water.update({ time, quantity })

    return res.json({ status: 'success', data: { id, userId, time, quantity } })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createWater,
  deleteWater,
  getAllWater,
  getWater,
  updateWater
}
