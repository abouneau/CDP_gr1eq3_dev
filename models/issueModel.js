class Issue {
  /**
   * Construct a new issue
   * color {String} : color for the div containing the display of the issue on the differents pages
   * @param {String} issueID The ID of the issue (we can't have two issue with the same ID inside a project)
   * @param {String} projectID The ID of the project containing the issue (we can't have two project with the same ID)
   * @param {String} description The description of the issue
   * @param {Int} priority The priority of the issue
   * @param {Int} difficulty The difficulty of the issue
   * @param {String} state  The state of the issue ('toDo', 'onGoing' or 'end')
   *
   */
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
