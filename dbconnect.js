function addElementToDB (element, collection, message) {
  collection.insertOne(element, function (err, result) {
    if (err) console.log(err)
    else if (result) console.log(message)
  })
}

function findElementInDB (element, collection, message, failMessage) {
  collection.findOne(element, function (err, result) {
    if (err) console.log(err)
    else {
      if (result) console.log(message)
      else console.log(failMessage)
      return result
    }
  })
}

function updateElementInDB (oldElement, newElement, collection, message) {
  collection.updateOne(oldElement, newElement, function (err, result) {
    if (err) console.log(err)
    else if (result) console.log(message)
  })
}

function deleteElementFromDB (element, collection, message) {
  collection.deleteOne(element, function (err, result) {
    if (err) console.log(err)
    else if (result) console.log(message)
  })
}

function deleteCollection (collection, message) {
  collection.drop(function (err, result) {
    if (err) console.log(err)
    else if (result) console.log(message)
  })
}

function connectToDB () {
  client.connect(err => {
    if (err) throw err
  })
}

function disconnectFromDB () {
  client.close()
}

const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })
connectToDB()

module.exports = {
  addElementToDB,
  findElementInDB,
  updateElementInDB,
  deleteElementFromDB,
  deleteCollection,
  disconnectFromDB,
  client
}
