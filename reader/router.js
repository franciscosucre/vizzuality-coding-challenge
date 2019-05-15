const { Router } = require('@sugo/router')
const db = require('./mongodb')

const router = new Router().get('/', async (req, res) => {
  const col = await db.getEntriesCollection()
  const { limit, skip, filter, select: projection, sort } = req.query
  return col.find(filter, { limit, sort, projection, skip }).toArray()
})

module.exports = router
