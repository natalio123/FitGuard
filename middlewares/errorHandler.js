function createError(status, message) {
  const error = new Error(message)

  error.status = status

  return error
}

function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500

  res.status(statusCode).json({ status: 'error', message: err.message || 'internal server error' })
}

module.exports = { createError, errorHandler }
