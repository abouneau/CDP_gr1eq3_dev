function addElementToDB (element, collection) {
  collection.insertOne(element, function (err, result) {
    if (err) throw err
    if (result) console.log('Element with ID \'' + element._id + '\' inserted')
  })
}

function findElementInDB (element, collection) {
  collection.findOne(element, function (err, result) {
    if (err) throw err
    if (result) console.log(result._name)
  })
}

function updateElementInDB (oldElement, newElement, collection) {
  collection.updateOne(oldElement, newElement, function (err, result) {
    if (err) throw err
    if (result) console.log('Element with ID \'' + oldElement._id + '\' updated')
  })
}

function deleteElementFromDB (element, collection) {
  collection.deleteOne(element, function (err, result) {
    if (err) throw err
    if (result) console.log('Element with ID \'' + element._id + '\' deleted')
  })
}

function deleteCollection (collection) {
  collection.drop(function (err, result) {
    if (err) throw err
    if (result) console.log('Collection deleted')
  })
}

const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })
client.connect(err => {
  if (err) throw err
  const collection = client.db('accounts').collection('logins')
  // POST
  const user = { _id: 'user@example.com', _name: 'user', _password: 'password' } // mongo verifies that _id is unique
  addElementToDB(user, collection)
  // GET
  const userToFind = { _id: 'user@example.com' }
  findElementInDB(userToFind, collection)
  // UPDATE
  const oldUser = { id: 'user@example.com' }
  const newUser = { $set: { _name: 'newUser', _password: 'newPassword' } }
  updateElementInDB(oldUser, newUser, collection)
  // DELETE
  const userToDelete = { _id: 'user@example.com' }
  deleteElementFromDB(userToDelete, collection)
  // /!\/!\/!\ REMOVE A WHOLE COLLECTION /!\/!\/!\
  deleteCollection(collection)
  client.close()
})
