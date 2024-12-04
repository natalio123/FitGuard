const router = require('express').Router()

const { login, register } = require('../controllers/userController')
const { predict } = require('../controllers/predictionController')

const health = require('./health')
const medication = require('./medication')
const nutrition = require('./nutrition')
const physical = require('./physical')
const user = require('./user')
const water = require('./water')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/login', login)
router.post('/register', register)

router.post('/predict', verifyToken, predict)

router.use('/health', verifyToken, health)
router.use('/medication', verifyToken, medication)
router.use('/nutrition', verifyToken, nutrition)
router.use('/physical', verifyToken, physical)
router.use('/user', verifyToken, user)
router.use('/water', verifyToken, water)

module.exports = router
