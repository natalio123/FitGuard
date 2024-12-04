const router = require('express').Router()

const {
  createNutrition,
  deleteNutrition,
  getAllNutrition,
  getNutrition,
  updateNutrition
} = require('../controllers/nutritionController')

router.delete('/:id', deleteNutrition)
router.get('/', getAllNutrition)
router.get('/:id', getNutrition)
router.post('/', createNutrition)
router.put('/:id', updateNutrition)

module.exports = router
