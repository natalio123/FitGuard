const crypto = require('crypto')
const Validator = require('fastest-validator')

const { createError } = require('../middlewares/errorHandler')
const { Medication, MedicationDetail, User } = require('../models')

const v = new Validator()

const createMedication = async (req, res, next) => {
  try {
    const schema = { name: 'string|empty:false' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const userId = req.user.id

    const { name } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    await Medication.create({ id, userId, name })

    return res
      .status(201)
      .json({ status: 'success', message: 'user medication created successfully' })
  } catch (err) {
    next(err)
  }
}

const deleteMedication = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(id)

    if (!medication) throw createError(404, 'user medication not found')

    await medication.destroy()

    return res.json({ status: 'success', message: 'user medication deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const getAllMedication = async (req, res, next) => {
  try {
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findAll({
      include: [{ model: MedicationDetail, as: 'detail' }],
      where: { userId }
    })

    return res.json({ status: 'success', data: medication })
  } catch (err) {
    next(err)
  }
}

const getMedication = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(id, {
      include: [{ model: MedicationDetail, as: 'detail' }]
    })

    if (!medication) throw createError(404, 'user medication not found')

    return res.json({ status: 'success', data: medication })
  } catch (err) {
    next(err)
  }
}

const updateMedication = async (req, res, next) => {
  try {
    const schema = { name: 'string|empty:false' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = req.params.id
    const userId = req.user.id

    const { name } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(id)

    if (!medication) throw createError(404, 'user medication not found')

    await medication.update({ name })

    return res.json({ status: 'success', data: { id, userId, name } })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createMedication,
  deleteMedication,
  getAllMedication,
  getMedication,
  updateMedication
}
