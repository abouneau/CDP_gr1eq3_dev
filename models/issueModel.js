class Issue {
  constructor (id, projectID, name, description, priority, difficulty) {
    this._id = id
    this._projectID = projectID
    this._name = name
    this._description = description
    this._priority = priority
    this._difficulty = difficulty
  }
}

module.exports = Issue
