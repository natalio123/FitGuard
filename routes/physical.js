const router = require('express').Router()

const {
  createPhysical,
  deletePhysical,
  getAllPhysical,
  getPhysical,
  updatePhysical
} = require('../controllers/physicalController')

router.delete('/:id', deletePhysical)
router.get('/', getAllPhysical)
router.get('/:id', getPhysical)
router.post('/', createPhysical)
router.put('/:id', updatePhysical)

module.exports = router
