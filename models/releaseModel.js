class Release {
/**
 * Construct a new release
 * releasedUserStories {Array[String]} : Contains the issue released in this release
 * difficultyAchieved {Int} : Sum of the difficulty of the issues released in this release
 * @param {String} projectID The ID of the project containing the release (we can't have two project with the same ID)
 * @param {String} version The version of the release (we can't have two release with the same versoin inside a project)
 * @param {String} description The description of the release
 * @param {String} date The date when the release is made
 */
  constructor (projectID, version, description, date) {
    this._projectID = projectID
    this._version = version
    this._description = description
    this._date = date
    this._releasedUserStories = []
    this._difficultyAchieved = null
  }

  /**
   * Add an element to releasedUserStories (only if releasedUserStories not already contains this element)
   * @param {String} userStoryReleased The element to add to releasedUserStories
   */
  addReleasedUserStory (userStoryReleased) {
    if (!this._releasedUserStories.includes(userStoryReleased)) {
      this._releasedUserStories.push(userStoryReleased)
    }
  }
}

module.exports = Release
