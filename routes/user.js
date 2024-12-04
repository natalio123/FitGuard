const router = require('express').Router()

const Multer = require('multer')

const { getUser, updatePassword, updateUser } = require('../controllers/userController')

const multer = Multer({ limits: { fileSize: 25 * 1024 * 1024 }, storage: Multer.memoryStorage() })

router.get('/', getUser)
router.put('/', multer.single('avatar'), updateUser)
router.put('/change-password', updatePassword)

module.exports = router
