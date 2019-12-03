class Sprint {
    constructor (id, projectID, description, beginDate, endDate) {
      this._id = id
      this._projectID = projectID
      this._description = description
      this._beginDate = beginDate
      this._endDate = endDate
      this._linkedUserStories = []
      this._totalDifficulty = null
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