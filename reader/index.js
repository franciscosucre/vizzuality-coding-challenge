const db = require('./mongodb')
const server = require('./server')

db.connect().then(() => server.listen(process.env.ENV || 3000))
