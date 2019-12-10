class Sprint {
  /**
   * Construct a new sprint
   * linkedUserStories {Array[String]} : Contains the issue linked to this sprint
   * totalDifficulty {Int} : Sum of the difficulty of the issues linked to this sprint
   * state {String} : The state of the sprint ('toDo', 'onGoing' or 'end')
   * color {String} : color for the div containing the display of the sprint on the differents pages
   * @param {String} projectID The ID of the project containing the sprint (we can't have two project with the same ID)
   * @param {String} name The name of the sprint
   * @param {String} beginDate The date of the begining of the sprint
   * @param {String} endDate The date of the ending of the sprint
   */
  constructor (projectID, name, beginDate, endDate) {
    this._projectID = projectID
    this._name = name
    this._beginDate = beginDate
    this._endDate = endDate
    this._linkedUserStories = []
    this._totalDifficulty = 0
    this._state = null
    this._color = null
  }

  /**
   * Add an element to linkedUserStories (only if linkedUserStories not already contains this element)
   * @param {String} userStoryReleased The element to add to linkedUserStories
   */
  addLinkedUserStory (userStoryToLink) {
    if (!this._linkedUserStories.includes(userStoryToLink)) {
      this._linkedUserStories.push(userStoryToLink)
    }
  }
}

module.exports = Sprint
