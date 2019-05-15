const mongodb = require('mongodb')
const client = new mongodb.MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true })

const connect = () => client.connect()

const disconnect = () => client.close()

const getDb = async () => {
  if (!client.isConnected()) {
    await connect()
  }
  return client.db()
}

const getCollection = name => getDb().then(db => db.collection(name))

const getEntriesCollection = () => getCollection('entries')

module.exports = {
  connect,
  disconnect,
  getCollection,
  getEntriesCollection
}
