class Test {
  /**
   *
   * @param {String} projectID The ID of the project containing the test (we can't have two project with the same ID)
   * @param {String} name The name of the test
   * @param {String} description The description of the test
   */
  constructor (projectID, name, description) {
    this._projectID = projectID
    this._name = name
    this._description = description
  }
}

module.exports = Test
