require('dotenv').config()

const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const path = require('path')

const { errorHandler } = require('./middlewares/errorHandler')

const router = require('./routes')

const app = express()

app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.use(errorHandler)

module.exports = app
