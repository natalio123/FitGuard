const router = require('express').Router()

const {
  createMedication,
  deleteMedication,
  getAllMedication,
  getMedication,
  updateMedication
} = require('../controllers/medicationController')

const {
  createMedicationDetail,
  deleteMedicationDetail,
  getMedicationDetail,
  updateMedicationDetail
} = require('../controllers/medicationDetailController')

router.delete('/:id', deleteMedication)
router.get('/', getAllMedication)
router.get('/:id', getMedication)
router.post('/', createMedication)
router.put('/:id', updateMedication)

router.delete('/:medicationId/:id', deleteMedicationDetail)
router.get('/:medicationId/:id', getMedicationDetail)
router.post('/:medicationId/', createMedicationDetail)
router.put('/:medicationId/:id', updateMedicationDetail)

module.exports = router
