class Issue {
  constructor (issueID, projectID, description, priority, difficulty, state) {
    this._issueID = issueID
    this._projectID = projectID
    this._description = description
    this._priority = priority
    this._difficulty = difficulty
    this._state = state
    this._color = null
  }
}

module.exports = Issue
