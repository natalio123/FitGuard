const tf = require('@tensorflow/tfjs-node')
const crypto = require('crypto')
const Validator = require('fastest-validator')

const { createError } = require('../middlewares/errorHandler')
const { predictionModel } = require('../middlewares/initializeModel')

const { Prediction, User } = require('../models')

const v = new Validator()

const predict = async (req, res, next) => {
  try {
    const schema = {
      pregnancies: 'number|empty:false',
      bloodGlucose: 'number|empty:false',
      bloodPressure: 'number|empty:false',
      skinThickness: 'number|empty:false',
      insulin: 'number|empty:false',
      bmi: 'number|empty:false',
      diabetesPedigreeFunction: 'number|empty:false',
      age: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const userId = req.user.id

    const {
      pregnancies,
      bloodGlucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age
    } = req.body

    const user = await User.findByPk(userId)

    if (!user) throw createError(404, 'user not found')

    const model = await predictionModel()

    const input = tf.tensor2d(
      [
        [
          pregnancies,
          bloodGlucose,
          bloodPressure,
          skinThickness,
          insulin,
          bmi,
          diabetesPedigreeFunction,
          age
        ]
      ],
      [1, 8]
    )

    const prediction = model.predict(input)

    const predictionArray = prediction.arraySync()

    const result = predictionArray[0][0]

    const outcome = result > 0.5 ? 1 : 0

    await Prediction.create({
      id,
      userId,
      pregnancies,
      bloodGlucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age,
      outcome
    })

    return res.json({
      status: 'success',
      data: { result: result > 0.5 ? 'Diabetes' : 'Non Diabetes', probability: result }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { predict }
