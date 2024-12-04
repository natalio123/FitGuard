const router = require('express').Router()

const {
  createWater,
  deleteWater,
  getAllWater,
  getWater,
  updateWater
} = require('../controllers/waterController')

router.delete('/:id', deleteWater)
router.get('/', getAllWater)
router.get('/:id', getWater)
router.post('/', createWater)
router.put('/:id', updateWater)

module.exports = router
