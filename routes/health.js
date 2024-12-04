const router = require('express').Router()

const {
  createHealth,
  deleteHealth,
  getAllHealth,
  getHealth,
  updateHealth
} = require('../controllers/healthController')

router.delete('/:id', deleteHealth)
router.get('/', getAllHealth)
router.get('/:id', getHealth)
router.post('/', createHealth)
router.put('/:id', updateHealth)

module.exports = router
