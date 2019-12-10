class Release {
  constructor (projectID, version, description, date) {
    this._projectID = projectID
    this._version = version
    this._description = description
    this._date = date
    this._releasedUserStories = []
    this._difficultyAchieved = null
  }

  addReleasedUserStory (userStoryReleased) {
    if (!this._releasedUserStories.includes(userStoryReleased)) {
      this._releasedUserStories.push(userStoryReleased)
    }
  }
}

module.exports = Release
