const { createServer } = require('@sugo/server')
const { getMiddleware: parseJSONBody } = require('@sugo/body-parser-json')
const router = require('./router')
const { handleError, logRequest, logResponse, parseQueryParams } = require('./middleware')
const logger = require('./logger')

const server = createServer((req, res) => router.handle(req, res))
  .useMiddleware(handleError)
  .useMiddleware(parseJSONBody())
  .useMiddleware(parseQueryParams)
  .useMiddleware(logRequest)
  .useMiddleware(logResponse)
  .addListener('listening', () => logger.debug(`ENVOIRMENT: ${JSON.stringify(process.env, null, 2)}`))
  .addListener('listening', () => logger.info(`Sever listening on port ${server.address().port}`))

module.exports = server
