
class Task {
    constructor(id, description, estimatedTime, dependencies, linkedUserStories, advancementState, assignedDeveloper){
        this._id = id
        this._description = description
        this._estimatedTime = estimatedTime
        this._dependencies = dependencies
        this._linkedUserStories = linkedUserStories
        this._advancementState = advancementState
        this._assignedDeveloper = assignedDeveloper
    }
}

module.exports = Task