const { Router } = require('@sugo/router')
const db = require('./mongodb')

const router = new Router().get('/', async (req, res) => {
  const col = await db.getEntriesCollection()
  const { limit, skip, filter, select: projection, sort } = req.query
  const [docs, count] = await Promise.all([
    col.find(filter, { limit, sort, projection, skip }).toArray(),
    col.countDocuments(filter)
  ])
  return res.status(200).json({ docs, count })
})

module.exports = router
