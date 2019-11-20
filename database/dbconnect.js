/**
 * Add an element to the given collection, and display a message when successful
 * @param {*} element The element to add
 * @param {*} collection The collection where to add the element
 * @param {*} message The message to show when successful
 */
function addElementToDB (element, collection, message) {
  return collection.insertOne(element, '')
    .then(result => {
      if (result) console.log(message || `Successfully added: ${result}`)
      return result
    })
    .catch(err => {
      console.error(`Failed to add: ${err}`)
      return null
    })
}

/**
 * Find an element corresponding to the given one in the given collection,
 * and display a message to tell if an element was found.
 * @param {*} element The element to find. If it has less items than the elements in
 * the database, then only the common arguments must be checked.
 * @param {*} collection The collection where the element must be found
 * @param {*} message The message to show when successful
 * @param {*} failMessage The message to show when not successful
 */
function findElementInDB (element, collection, message, failMessage) {
  return collection.findOne(element, '')
    .then(result => {
      if (result) {
        console.log(message || `Successfully found: ${result}`)
      } else {
        throw new Error('Element not found...')
      }
      return result
    })
    .catch(err => {
      throw err
    })
}

function elementExists (element, collection) {
  return collection.findOne(element)
    .then(result => {
      if (result) {
        return true
      }
      return false
    })
}

/**
 * Get all elements from a whole collection, in an array
 * @param {*} collection The collection to get
 */
function getWholeCollection (collection, filterCriterion) {
  return collection.find(filterCriterion).toArray()
}

/**
 * Modify an element in the given collection, and show a message when successful.
 * @param {*} oldElement The element to replace
 * @param {*} newElement The element that will replace the other
 * @param {*} collection The collection in which to replace the element
 * @param {*} message The message to show when successful
 */
function updateElementInDB (oldElement, newElement, collection, message) {
  return collection.updateOne(oldElement, { $set: newElement }).then(result => {
    if (result) {
      console.log(message)
      return result
    }
  })
}

/**
 * Delete an element from the given collection, and show a message when successful
 * @param {*} element The element to delete
 * @param {*} collection The collection in which to delete the element
 * @param {*} message The essage to show when successful
 */
function deleteElementFromDB (element, collection, message) {
  collection.deleteOne(element).then(result => {
    if (result) {
      console.log(message)
      return result
    }
  })
}

/**
 * Delete a whole collection, and show a message when successful.
 * To be used in emergency cases only!
 * @param {*} collection The collection to delete
 * @param {*} message The message to show when successful
 */
function deleteCollection (collection, message) {
  collection.drop(function (err, result) {
    if (err) console.log(err)
    else if (result) console.log(message)
  })
}

/**
 * Connect the client to the mongo database
 */
function connectToDB () {
  client.connect(err => {
    if (err) throw err
  })
}

/**
 * Disconnect the client from the mongo database.
 * To be used in emergency cases only!
 */
function disconnectFromDB () {
  client.close()
}

const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const url = 'mongodb://mongo:27017'
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true })
connectToDB()

module.exports = {
  addElementToDB,
  findElementInDB,
  elementExists,
  getWholeCollection,
  updateElementInDB,
  deleteElementFromDB,
  deleteCollection,
  disconnectFromDB,
  client
}
