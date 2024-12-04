const { Storage } = require('@google-cloud/storage')

const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')
const path = require('path')

const { createError } = require('../middlewares/errorHandler')
const { User } = require('../models')

const { DEFAULT_AVATAR_URL, GCS_BUCKET_NAME, JWT_SECRET, JWT_TOKEN_EXPIRED } = process.env

const keyFilename = path.resolve('./service-account-key.json')

const v = new Validator()

const storage = new Storage({ keyFilename })

const bucket = storage.bucket(GCS_BUCKET_NAME)

const getUser = async (req, res, next) => {
  try {
    const id = req.user.id

    const user = await User.findByPk(id, { attributes: ['id', 'avatar', 'name', 'email'] })

    if (!user) throw createError(404, 'user not found')

    return res.json({ status: 'success', data: user })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const schema = { email: 'email|empty:false', password: 'string|min:6' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) throw createError(404, 'user not found')

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) throw createError(401, 'password is incorrect')

    const data = { id: user.id, avatar: user.avatar, name: user.name, email: user.email }

    const token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRED })

    res.json({ status: 'success', token })
  } catch (err) {
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    const schema = { email: 'email|empty:false', password: 'string|min:6' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = crypto.randomUUID()

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) throw createError(409, 'email already exist')

    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({
      id,
      avatar: DEFAULT_AVATAR_URL,
      name: 'John Doe',
      email,
      password: hashPassword
    })

    return res.status(201).json({ status: 'success', message: 'user created successfully' })
  } catch (err) {
    next(err)
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const schema = { newPassword: 'string|min:6', oldPassword: 'string|min:6' }

    const validate = v.validate(req.body, schema)

    if (validate.length) throw createError(400, 'please fill in all required field')

    const id = req.user.id

    const { newPassword, oldPassword } = req.body

    const user = await User.findByPk(id)

    if (!user) throw createError(404, 'user not found')

    const isValidPassword = await bcrypt.compare(oldPassword, user.password)

    if (!isValidPassword) throw createError(401, 'old password is incorrect')

    const hashPassword = await bcrypt.hash(newPassword, 10)

    await user.update({ password: hashPassword })

    return res.json({ status: 'success', message: 'password updated successfully' })
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const schema = { name: 'string|empty:false' }

    const validate = v.validate(req.body, schema)

    if (!req.file && validate.length) throw createError(400, 'please fill in all required field')

    const id = req.user.id

    const { name } = req.body

    const user = await User.findByPk(id)

    if (!user) throw createError(404, 'user not found')

    const originalName = req.file.originalname
    const fileExtension = originalName.substring(originalName.lastIndexOf('.'))

    const blob = bucket.file('avatars/' + req.user.id + '-' + Date.now() + fileExtension)
    const blobStream = blob.createWriteStream({ resumable: false })

    const avatar = `https://storage.googleapis.com/${bucket.name}/${blob.name}`

    blobStream.on('error', (err) => res.status(500).json({ status: 'error', message: err.message }))

    blobStream.on('finish', async () => {
      const parts = user.avatar.split('avatars')

      const oldPath = `avatars${parts[1]}`

      if (oldPath !== 'avatars/default.png') await bucket.file(oldPath).delete()

      await user.update({ avatar, name })
    })

    blobStream.end(req.file.buffer)

    return res.json({ status: 'success', data: { id, avatar, name, email: user.email } })
  } catch (err) {
    next(err)
  }
}

module.exports = { getUser, login, register, updatePassword, updateUser }
