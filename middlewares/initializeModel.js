const tf = require('@tensorflow/tfjs-node')

let predictModel

const predictionModel = async () => {
  if (!predictModel) {
    predictModel = await tf.loadLayersModel(process.env.PREDICTION_MODEL_URL)

    console.log('prediction model loaded successfully')
  }

  return predictModel
}

module.exports = { predictionModel }
