
class Task {
  constructor (taskID, projectID, description, estimatedTime, dependencies, advancementState, assignedDeveloper) {
    this._taskID = taskID
    this._projectID = projectID
    this._description = description
    this._estimatedTime = estimatedTime
    this._dependencies = dependencies
    this._linkedUserStories = []
    this._advancementState = advancementState
    this._assignedDeveloper = assignedDeveloper
    this._color = null
  }

  addLinkedUserStory (userStoryToLink) {
    if (!this._linkedUserStories.includes(userStoryToLink)) {
      this._linkedUserStories.push(userStoryToLink)
    }
  }
}

module.exports = Task
