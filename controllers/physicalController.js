const crypto = require('crypto')
const Validator = require('fastest-validator')

const { Op } = require('sequelize')

const { createError } = require('../middlewares/errorHandler')
const { Physical, User } = require('../models')

const v = new Validator()

const createPhysical = async (req, res, next) => {
  try {
    const schema = { step: 'number|empty:false', calorie: 'number|empty:false' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const userId = req.user.id

    const { step, calorie } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const startOfDay = new Date()

    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()

    endOfDay.setHours(23, 59, 59, 999)

    const physical = await Physical.findOne({
      where: { userId: userId, createdAt: { [Op.between]: [startOfDay, endOfDay] } }
    })

    if (physical) throw createError(409, 'user physical already created for this day')

    await Physical.create({ id, userId, step, calorie })

    return res
      .status(201)
      .json({ status: 'success', message: 'user physical created successfully' })
  } catch (err) {
    next(err)
  }
}

const deletePhysical = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const physical = await Physical.findByPk(id)

    if (!physical) throw createError(404, 'user physical not found')

    await physical.destroy()

    return res.json({ status: 'success', message: 'user physical deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const getAllPhysical = async (req, res, next) => {
  try {
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const physical = await Physical.findAll({ where: { userId } })

    return res.json({ status: 'success', data: physical })
  } catch (err) {
    next(err)
  }
}

const getPhysical = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const physical = await Physical.findByPk(id)

    if (!physical) throw createError(404, 'user physical not found')

    return res.json({ status: 'success', data: physical })
  } catch (err) {
    next(err)
  }
}

const updatePhysical = async (req, res, next) => {
  try {
    const schema = { step: 'number|empty:false', calorie: 'number|empty:false' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = req.params.id
    const userId = req.user.id

    const { step, calorie } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const physical = await Physical.findByPk(id)

    if (!physical) throw createError(404, 'user physical not found')

    await physical.update({ step, calorie })

    return res.json({ status: 'success', data: { id, userId, step, calorie } })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPhysical,
  deletePhysical,
  getAllPhysical,
  getPhysical,
  updatePhysical
}
