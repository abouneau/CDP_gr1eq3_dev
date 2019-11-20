class Issue {
  constructor (id, projectID, name, description, priority, difficulty, state) {
    this._id = id
    this._projectID = projectID
    this._name = name
    this._description = description
    this._priority = priority
    this._difficulty = difficulty
    this._state = state
    this._color = null
  }
}

module.exports = Issue
