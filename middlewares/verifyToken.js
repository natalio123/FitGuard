const jwt = require('jsonwebtoken')

const { createError } = require('./errorHandler')

const { JWT_SECRET } = process.env

module.exports = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json({ status: 'error', message: 'token not found' })

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ status: 'error', message: 'invalid token' })

    req.user = decoded

    next()
  })
}
