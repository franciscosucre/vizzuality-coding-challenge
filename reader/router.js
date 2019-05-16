const { Router } = require('@sugo/router');
const db = require('./mongodb');

const router = new Router().get('/', async (req, res) => {
  const col = await db.getEntriesCollection();
  const { limit, skip, filter, select: projection, sort } = req.query;
  const docs = await col.find(filter, { limit, sort, projection, skip }).toArray();
  return res.status(200).json(docs);
});

module.exports = router;
