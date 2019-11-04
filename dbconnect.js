function addElementToDB (element, collection, message) {
  return collection.insertOne(element, function (err, result) {
    if (err) throw err
    if (result) console.log(message)
  })
}

function findElementInDB (element, collection, message) {
  return collection.findOne(element, function (err, result) {
    if (err) throw err
    if (result) {
      console.log(message)
    }
  })
}

function updateElementInDB (oldElement, newElement, collection, message) {
  return collection.updateOne(oldElement, newElement, function (err, result) {
    if (err) throw err
    if (result) console.log(message)
  })
}

function deleteElementFromDB (element, collection, message) {
  return collection.deleteOne(element, function (err, result) {
    if (err) throw err
    if (result) console.log(message)
  })
}

function deleteCollection (collection, message) {
  return collection.drop(function (err, result) {
    if (err) throw err
    if (result) console.log(message)
  })
}

const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })

module.exports = {
  addElementToDB,
  findElementInDB,
  updateElementInDB,
  deleteElementFromDB,
  deleteCollection,
  client
}
