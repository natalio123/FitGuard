const crypto = require('crypto')
const Validator = require('fastest-validator')

const { createError } = require('../middlewares/errorHandler')
const { Medication, MedicationDetail, User } = require('../models')

const v = new Validator()

const createMedicationDetail = async (req, res, next) => {
  try {
    const schema = {
      type: 'string|empty:false',
      time: 'string|empty:false',
      quantity: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const medicationId = req.params.medicationId
    const userId = req.user.id

    const { type, time, quantity } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(medicationId)

    if (!medication) throw createError(404, 'user medication not found')

    await MedicationDetail.create({ id, userId, medicationId, type, time, quantity })

    return res
      .status(201)
      .json({ status: 'success', message: 'user medication detail created successfully' })
  } catch (err) {
    next(err)
  }
}

const deleteMedicationDetail = async (req, res, next) => {
  try {
    const { id, medicationId } = req.params

    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(medicationId)

    if (!medication) throw createError(404, 'user medication not found')

    const medicationDetail = await MedicationDetail.findByPk(id)

    if (!medicationDetail) throw createError(404, 'user medication detail not found')

    await medicationDetail.destroy()

    return res.json({ status: 'success', message: 'user medication detail deleted successfully' })
  } catch (err) {
    next(err)
  }
}

const getMedicationDetail = async (req, res, next) => {
  try {
    const { id, medicationId } = req.params

    const userId = req.user.id

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(medicationId)

    if (!medication) throw createError(404, 'user medication not found')

    const medicationDetail = await MedicationDetail.findByPk(id)

    if (!medicationDetail) throw createError(404, 'user medication detail not found')

    return res.json({ status: 'success', data: medicationDetail })
  } catch (err) {
    next(err)
  }
}

const updateMedicationDetail = async (req, res, next) => {
  try {
    const schema = {
      type: 'string|empty:false',
      time: 'string|empty:false',
      quantity: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const { id, medicationId } = req.params

    const userId = req.user.id

    const { type, time, quantity } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const medication = await Medication.findByPk(medicationId)

    if (!medication) throw createError(404, 'user medication not found')

    const medicationDetail = await MedicationDetail.findByPk(id)

    if (!medicationDetail) throw createError(404, 'user medication detail not found')

    await medicationDetail.update({ type, time, quantity })

    return res.json({ status: 'success', data: { id, userId, medicationId, type, time, quantity } })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createMedicationDetail,
  deleteMedicationDetail,
  getMedicationDetail,
  updateMedicationDetail
}
