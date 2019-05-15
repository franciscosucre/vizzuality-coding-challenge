const { MongoDbQueryParams } = require('@sugo/mongodb-queryparams')

const logger = require('./logger')

exports.handleError = async (req, res, next) => {
  try {
    await next()
  } catch (err) {
    const defaultValues = {
      code: 'N/A',
      message: 'Unexpected Error',
      name: err.name ? err.name : err.constructor.name ? err.constructor.name : 'Error',
      status: 500
    }
    const json = Object.getOwnPropertyNames(err).reduce((obj, key) => {
      obj[key] = err[key]
      return obj
    }, defaultValues)
    res.status(json.status).json(json)
    const { id, statusCode, statusMessage, body, method, url } = res
    const log = `Response ID: ( ${id} ) ${method}: ${url} ${statusCode} ${statusMessage} ---> body: ${JSON.stringify(
      body
    )}`
    logger.error(log)
  }
}

exports.logRequest = async (req, res, next) => {
  let log = util.format('Request ID: ( %s ) %s: %s', req.id, req.method, req.url)
  log += util.format(' --> query %j', req.query)
  log += util.format(' --> body %j', req.body)
  logger.info(log)
  return next ? await next() : null
}

exports.logResponse = async (req, res, next) => {
  next ? await next() : null
  const { id, statusCode, statusMessage, body, method, url } = res
  const log = `Response ID: ( ${id} ) ${method}: ${url} ${statusCode} ${statusMessage} ---> body: ${JSON.stringify(
    body
  )}`
  logger.info(log)
}

exports.parseQueryParams = async (req, res, next) => {
  req.query = MongoDbQueryParams.parseQueryParams(req.query)
  return next ? await next() : null
}
