
class Task {
  constructor (id, projectID, description, estimatedTime, dependencies, linkedUserStories, advancementState, assignedDeveloper) {
    this._id = id
    this._projectID = projectID
    this._description = description
    this._estimatedTime = estimatedTime
    this._dependencies = dependencies
    this._linkedUserStories = linkedUserStories
    this._advancementState = advancementState
    this._assignedDeveloper = assignedDeveloper
    this._color = null
  }
}

module.exports = Task
