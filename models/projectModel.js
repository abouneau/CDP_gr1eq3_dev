class Project {
  constructor (name, description, creator) {
    this._name = name
    this._description = description
    this._contributors = [creator]
    this._issues = []
    this._tasks = []
    this._sprints = []
    this._tests = []
    this._releases = []
  }

  addContributor (contributor) {
    this.contributors.push(contributor)
  }

  addIssue (issue) {
    this._issues.push(issue)
  }

  addTask (task) {
    this._tasks.push(task)
  }

  addSprint (sprint) {
    this._sprints.push(sprint)
  }

  addTest (test) {
    this._tests.push(test)
  }

  addRelease (release) {
    this._releases.push(release)
  }

  getContributors () {
    return this._contributors
  }

  getIssues () {
    return this._issues
  }

  getTasks () {
    return this.tasks
  }

  getSprints () {
    return this._sprints
  }

  getTests () {
    return this._tests
  }

  getReleases () {
    return this._releases
  }
}

module.exports = Project
