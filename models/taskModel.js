
class Task {
  /**
   * Construct a new task
   * linkedUserStories {Array[String]} : Contains the issue linked to this task
   * color {String} : color for the div containing the display of the task on the differents pages
   * @param {String} taskID The ID of the task (we can't have two task with the same ID inside a project)
   * @param {String} projectID The ID of the project containing the task (we can't have two project with the same ID)
   * @param {String} description The description of the task
   * @param {String} estimatedTime The time estimate for the realisation of the task
   * @param {String} dependencies The tasks that this task depend on
   * @param {String} advancementState The state of the task ('toDo', 'onGoing' or 'end')
   * @param {String} assignedDeveloper The developper assigned to the task
   */
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

module.exports = Task
