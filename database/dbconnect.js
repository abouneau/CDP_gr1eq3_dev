/**
 * Module containing all methods to connect to the database
 * @module dbconnect
 */

/**
 * Add an element to the given collection, and display a message when successful
 * @param {object} element - The element to add
 * @param {object} collection - The collection where to add the element
 * @param {string} message - The message to show when successful
 * @return {promise} The promise that the element will be added if possible, then the element added
 */
function addElementToDB (element, collection, message) {
  return collection.insertOne(element, '').then(result => {
    if (result) console.log(message || `Successfully added: ${result}`)
    return result
  }).catch(err => {
    console.error(`Failed to add: ${err}`)
    return null
  })
}

/**
 * Find an element corresponding to the given one in the given collection,
 * and display a message to tell if an element was found.
 * @param {object} element - The element to find. If it has less items than the elements in
 * the database, then only the common arguments must be checked.
 * @param {object} collection - The collection where the element must be found
 * @param {string} message - The message to show when successful
 * @param {string} failMessage - The message to show when not successful
 * @return {promise} The promise that the element will be searched if possible, then the element found
 */
function findElementInDB (element, collection, message, failMessage) {
  return collection.findOne(element, '').then(result => {
    if (result) {
      console.log(message || `Successfully found: ${result}`)
    } else {
      console.log('Element not found...')
    }
    return result
  }).catch(err => {
    throw err
  })
}

/**
 * Tells if an element already exists in a given collection.
 * @param {object} element - The element to find. If it has less items than the elements in
 * the database, then only the common arguments must be checked.
 * @param {object} collection - The collection where the element must be found
 * @return {promise} The promise that the element will be searched if possible, then true if it exists, false if it does not exist
 */
function elementExists (element, collection) {
  return collection.findOne(element).then(result => {
    if (result) {
      return true
    }
    return false
  }).catch(err => {
    throw err
  })
}

/**
 * Get all elements from a whole collection, in an array
 * @param {object} collection - The collection to get
 * @return {promise} The promise that the collection will be found if possible, then the whole collection, in an array
 */
function getWholeCollection (collection, filterCriterion) {
  return collection.find(filterCriterion).toArray()
}

/**
 * Modify an element in the given collection, and show a message when successful.
 * @param {object} oldElement - The element to replace
 * @param {object} newElement - The element that will replace the other
 * @param {object} collection - The collection in which to replace the element
 * @param {string} message - The message to show when successful
 * @return {promise} The promise that the element will be updated if possible, then the updated element
 */
function updateElementInDB (oldElement, newElement, collection, message) {
  return collection.updateOne(oldElement, { $set: newElement }).then(result => {
    if (result) {
      console.log(message)
      return result
    }
  }).catch(err => {
    throw err
  })
}

/**
 * Delete an element from the given collection, and show a message when successful
 * @param {object} element - The element to delete
 * @param {object} collection - The collection in which to delete the element
 * @param {string} message - The essage to show when successful
 * @return {promise} The promise that the element will be deleted if possible
 */
function deleteElementFromDB (element, collection, message) {
  return collection.deleteOne(element).then(result => {
    if (result) {
      console.log(message)
      return result
    }
  }).catch(err => {
    throw err
  })
}

/**
 * Delete a whole collection, and show a message when successful.
 * To be used in emergency cases only!
 * @param {object} collection - The collection to delete
 * @param {string} message - The message to show when successful
 * @return {promise} The promise that the collection will be deleted if possible
 */
function deleteCollection (collection, message) {
  return collection.drop().then(() => {
    console.log('Collection removed')
  }).catch(err => {
    throw err
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
 * @return {promise} The promise that the app will be disconnected from the database if possible
 */
function disconnectFromDB () {
  return client.close().then(() => {
    console.log('Connection to the database closed')
  }).catch(err => {
    throw err
  })
}

const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
// const url = 'mongodb://mongo:27017'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })
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
