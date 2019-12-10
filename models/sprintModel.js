class Sprint {
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

  addLinkedUserStory (userStoryToLink) {
    if (!this._linkedUserStories.includes(userStoryToLink)) {
      this._linkedUserStories.push(userStoryToLink)
    }
  }
}

module.exports = Sprint
