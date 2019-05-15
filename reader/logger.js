const { Logger, ConsoleLoggerPlugIn, levels } = require('@sugo/logger')

const logger = new Logger({ plugins: [new ConsoleLoggerPlugIn()], level: levels.ALL })

module.exports = logger
